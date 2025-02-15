using MudBlazor;

namespace LuizaEstate.Web.Layout;

public partial class MainLayout
{
    private static readonly PaletteLight paletteLight =
        new()
        {
            Dark = "#2E4942",
            TextPrimary = "#2E4942",
            Primary = "#B87E58",

        };

    private readonly MudTheme mainTheme = new MudTheme()
    {
        PaletteLight = paletteLight,
        Typography = new Typography()
        {
            Default = new DefaultTypography()
            {
                FontFamily = new string[] { "Montserrat", "Comfortaa", "Helvetica", "Roboto" }
            }
        }
    };
}
