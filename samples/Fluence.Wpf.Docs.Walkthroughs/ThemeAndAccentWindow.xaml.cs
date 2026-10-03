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

using System.Windows;
using System.Windows.Media;
using Fluence.Wpf.Controls;
namespace Fluence.Wpf.Docs.Walkthroughs
{
    public sealed partial class ThemeAndAccentWindow : FluenceWindow
    {
        internal ThemeAndAccentWindow()
        {
            InitializeComponent();
            ThemeStatus.Text = "Following system theme and accent";
        }

        internal void PrepareCapture(ApplicationTheme theme)
        {
            ThemeStatus.Text = theme + " theme, blue accent";
        }

        private void Light_Click(object sender, RoutedEventArgs e)
        {
            ApplicationThemeManager.Apply(ApplicationTheme.Light);
            ThemeStatus.Text = "Light theme";
        }

        private void Dark_Click(object sender, RoutedEventArgs e)
        {
            ApplicationThemeManager.Apply(ApplicationTheme.Dark);
            ThemeStatus.Text = "Dark theme";
        }

        private void System_Click(object sender, RoutedEventArgs e)
        {
            ApplicationThemeManager.Apply(ApplicationTheme.Auto);
            ApplicationAccentColorManager.ApplySystemAccent();
            ThemeStatus.Text = "System theme and accent";
        }

        private void Blue_Click(object sender, RoutedEventArgs e)
        {
            ApplicationAccentColorManager.ApplyCustomAccent(Color.FromRgb(0x00, 0x78, 0xD4));
            ThemeStatus.Text = "Blue accent";
        }

        private void Purple_Click(object sender, RoutedEventArgs e)
        {
            ApplicationAccentColorManager.ApplyCustomAccent(Color.FromRgb(0x88, 0x57, 0xB7));
            ThemeStatus.Text = "Purple accent";
        }

        private void Backdrop_Click(object sender, RoutedEventArgs e)
        {
            SystemBackdropType = SystemBackdropType is WindowBackdropType.Mica
                ? WindowBackdropType.None
                : WindowBackdropType.Mica;
            ThemeStatus.Text = "Backdrop: " + SystemBackdropType;
        }
    }
}
