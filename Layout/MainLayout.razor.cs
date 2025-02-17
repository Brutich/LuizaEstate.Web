using MudBlazor;

namespace LuizaEstate.Web.Layout;

public partial class MainLayout
{
    private static readonly PaletteLight paletteLight =
        new()
        {
            Primary = "#B87E58",
            Secondary = "#2E4942",
            Tertiary = "#EAEAD9",
            TextPrimary = "#2E4942",
            Dark = "#2E4942",
            AppbarText = "#2E4942",
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
        },
        LayoutProperties = new LayoutProperties() { DefaultBorderRadius = "0px" }
    };
}
