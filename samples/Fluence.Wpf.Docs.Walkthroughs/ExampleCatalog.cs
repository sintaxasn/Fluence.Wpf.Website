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
using System.Collections.Generic;
using System.Windows;
namespace Fluence.Wpf.Docs.Walkthroughs
{
    internal static class ExampleCatalog
    {
        private static readonly Dictionary<string, Func<Window>> Factories = new(StringComparer.OrdinalIgnoreCase)
        {
            ["basic-usage"] = static () => new BasicUsageWindow(),
            ["window-and-title-bar"] = static () => new WindowAndTitleBarWindow(),
            ["theme-and-accent"] = static () => new ThemeAndAccentWindow(),
            ["inputs-and-data"] = static () => new InputsAndDataWindow(),
            ["navigation-and-tabs"] = static () => new NavigationAndTabsWindow(),
            ["dialogs-and-feedback"] = static () => new DialogsAndFeedbackWindow(),
        };

        internal static IEnumerable<string> Slugs => Factories.Keys;

        internal static bool TryCreate(string slug, out Window? window)
        {
            if (Factories.TryGetValue(slug, out Func<Window>? factory))
            {
                window = factory();
                return true;
            }

            window = null;
            return false;
        }
    }
}
