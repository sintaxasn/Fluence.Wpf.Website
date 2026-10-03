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
using System.Windows;
using System.Threading.Tasks;
using Fluence.Wpf.Controls;
namespace Fluence.Wpf.Docs.Walkthroughs
{
    public sealed partial class DialogsAndFeedbackWindow : FluenceWindow
    {
        internal DialogsAndFeedbackWindow()
        {
            InitializeComponent();
        }

        private void Save_Click(object sender, RoutedEventArgs e)
        {
            _ = SaveAsync();
        }

        private async Task SaveAsync()
        {
            ContentDialog dialog = new()
            {
                Title = "Save changes?",
                Content = "Confirm the sample save action.",
                PrimaryButtonText = "Save",
                CloseButtonText = "Cancel",
            };
            try
            {
                ContentDialogResult result = await dialog.ShowAsync().ConfigureAwait(true);
                if (result is ContentDialogResult.Primary)
                {
                    ShowSaved();
                }
                else
                {
                    SaveInfo.Title = "Canceled";
                    SaveInfo.Message = "No changes were saved.";
                    SaveInfo.Severity = InfoBarSeverity.Informational;
                }
            }
            catch (InvalidOperationException ex)
            {
                ShowSaveError(ex.Message);
            }
            catch (OperationCanceledException ex)
            {
                ShowSaveError(ex.Message);
            }
        }

        private void ShowSaveError(string message)
        {
            SaveInfo.Title = "Save failed";
            SaveInfo.Message = message;
            SaveInfo.Severity = InfoBarSeverity.Error;
        }

        private void ShowSaved()
        {
            SaveProgress.Value = 100;
            SaveInfo.Title = "Saved";
            SaveInfo.Message = "Your changes are up to date.";
            SaveInfo.Severity = InfoBarSeverity.Success;
        }

        internal void PrepareCapture()
        {
            ShowSaved();
        }
    }
}
