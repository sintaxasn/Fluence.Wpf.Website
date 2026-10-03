/*
 * Copyright 2026 Dan Cunningham
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Threading;
namespace Fluence.Wpf.Docs.Walkthroughs
{
    internal static class CaptureRunner
    {
        internal static async Task RunAsync(Application app)
        {
            int exitCode = 0;
            try
            {
                string directory = Path.Combine(FindWebsiteRoot(), "docs", "screenshots", "tutorials");
                _ = Directory.CreateDirectory(directory);
                foreach (ApplicationTheme theme in new[] { ApplicationTheme.Light, ApplicationTheme.Dark })
                {
                    ApplicationThemeManager.Apply(theme);
                    foreach (string slug in ExampleCatalog.Slugs)
                    {
                        ApplicationAccentColorManager.ApplySystemAccent();
                        if (!ExampleCatalog.TryCreate(slug, out Window? window) || window is null)
                        {
                            throw new InvalidOperationException("Example could not be created: " + slug);
                        }

                        app.MainWindow = window;
                        if (window is Fluence.Wpf.Controls.FluenceWindow fluentWindow)
                        {
                            fluentWindow.SystemBackdropType = WindowBackdropType.None;
                        }

                        if (window is BasicUsageWindow basic)
                        {
                            basic.PrepareCapture();
                        }
                        else if (window is ThemeAndAccentWindow themeWindow)
                        {
                            themeWindow.PrepareCapture(theme);
                        }
                        else if (window is InputsAndDataWindow inputs)
                        {
                            inputs.PrepareCapture();
                        }
                        else if (window is DialogsAndFeedbackWindow dialogs)
                        {
                            dialogs.PrepareCapture();
                        }

                        window.Show();
                        window.UpdateLayout();
                        await window.Dispatcher.InvokeAsync(static () => { }, DispatcherPriority.ApplicationIdle, CancellationToken.None).Task.ConfigureAwait(true);
                        await Task.Delay(220, CancellationToken.None).ConfigureAwait(true);
                        window.UpdateLayout();

                        int width = (int)Math.Ceiling(window.ActualWidth);
                        int height = (int)Math.Ceiling(window.ActualHeight);
                        RenderTargetBitmap bitmap = new(width, height, 96, 96, PixelFormats.Pbgra32);
                        bitmap.Render(window);
                        PngBitmapEncoder encoder = new();
                        encoder.Frames.Add(BitmapFrame.Create(bitmap));
                        string file = Path.Combine(directory, slug + "-" + theme.ToString().ToLowerInvariant() + ".png");
                        FileStream stream = File.Create(file);
                        await using (stream.ConfigureAwait(true))
                        {
                            encoder.Save(stream);
                        }

                        window.Close();
                    }
                }

                File.Delete(Path.Combine(directory, "capture-error.txt"));
            }
            catch (Exception ex)
            {
                exitCode = 1;
                await File.WriteAllTextAsync(Path.Combine(FindWebsiteRoot(), "docs", "screenshots", "tutorials", "capture-error.txt"), ex.ToString(), CancellationToken.None).ConfigureAwait(true);
                throw;
            }
            finally
            {
                app.Shutdown(exitCode);
            }
        }

        private static string FindWebsiteRoot()
        {
            DirectoryInfo? directory = new(AppContext.BaseDirectory);
            while (directory is not null)
            {
                if (File.Exists(Path.Combine(directory.FullName, "website", "sidebars.js")) &&
                    Directory.Exists(Path.Combine(directory.FullName, "docs", "screenshots", "tutorials")))
                {
                    return directory.FullName;
                }

                directory = directory.Parent;
            }

            throw new DirectoryNotFoundException("The website repository ancestor was not found.");
        }
    }
}
