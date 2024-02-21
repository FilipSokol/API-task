import { Settings } from "../../types/product";
import "./styles.css";
import TextField from "@mui/material/TextField";

type Props = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

function Topbar(props: Props) {
  const { settings, setSettings } = props;

  const handleValidation = (value: string) => {
    const regex = /^\d*$/;
    if (regex.test(value)) {
      let updatedSettings = { ...settings };
      updatedSettings["id"] = value;
      setSettings(updatedSettings);
    }
  };

  return (
    <section className="topbar">
      <TextField
        type="string"
        variant="outlined"
        size="small"
        label="Id"
        onChange={(e) => handleValidation(e.target.value)}
        value={settings.id}
      />
    </section>
  );
}

export default Topbar;
