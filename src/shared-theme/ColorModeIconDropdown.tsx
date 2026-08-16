import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useColorScheme } from "@mui/material/styles";

export default function ColorModeIconDropdown() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return <span className="theme-toggle theme-toggle--loading" aria-hidden="true" />;
  }

  const resolvedMode = mode === "system" ? systemMode : mode;
  const nextMode = resolvedMode === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Use ${nextMode} theme`}
      onClick={() => setMode(nextMode)}
    >
      <span className="theme-toggle__sun">
        <LightModeRoundedIcon />
      </span>
      <span className="theme-toggle__moon">
        <DarkModeRoundedIcon />
      </span>
    </button>
  );
}
