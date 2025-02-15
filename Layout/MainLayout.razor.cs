using MudBlazor;

namespace LuizaEstate.Web.Layout;

public partial class MainLayout
{
    private readonly MudTheme mainTheme = new MudTheme()
    {
        Typography = new Typography()
        {
            Default = new DefaultTypography()
            {
                FontFamily = new string[] { "Montserrat", "Comfortaa", "Helvetica", "Roboto" }
            }
        }
    };
}
