import { useState } from "react";
import BarcodeGenerator from "./components/BarcodeGenerator";
import "./App.css";

function App() {
  const [iban, setIban] = useState("");
  const [euros, setEuros] = useState("");
  const [cents, setCents] = useState("");
  const [reference, setReference] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Optional: Add validation here if needed
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Bank Barcode Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="iban">IBAN: </label>
            <input
              type="text"
              id="iban"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              placeholder="FIXX XXXX XXXX XXXX XX"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="euros">Euros: </label>
            <input
              type="number"
              id="euros"
              value={euros}
              onChange={(e) => setEuros(e.target.value)}
              placeholder="Amount in euros"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cents">Cents: </label>
            <input
              type="number"
              id="cents"
              value={cents}
              onChange={(e) => setCents(e.target.value)}
              placeholder="Amount in cents"
              max="99"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reference">Reference: </label>
            <input
              type="text"
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="RF Reference"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date: </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Generate Barcode
          </button>
        </form>

        <div className="barcode-container">
          <h2>Generated Barcode</h2>
          {iban && euros && cents && reference && (
            <BarcodeGenerator
              iban={iban}
              euros={euros}
              cents={cents}
              reference={reference}
              dueDate={dueDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
