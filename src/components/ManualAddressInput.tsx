import { useState, useMemo } from "react";
import { isAddress, getAddress } from "viem";

export default function ManualAddressInput({
  onSelect
}: {
  onSelect: (address: `0x${string}` | null) => void;
}) {
  const [raw, setRaw] = useState("");
  const valid = useMemo(() => isAddress(raw as `0x${string}`), [raw]);
  const checksum = useMemo(
    () => (valid ? (getAddress(raw as `0x${string}`) as `0x${string}`) : null),
    [valid, raw]
  );

  return (
    <div className="card">
      <label htmlFor="address" className="label">Atau masukkan alamat wallet (Base)</label>
      <div className="row">
        <input
          id="address"
          placeholder="0x…"
          value={raw}
          onChange={(e) => setRaw(e.target.value.trim())}
          className="input"
          spellCheck={false}
        />
        <button
          className="btn"
          disabled={!valid}
          onClick={() => onSelect(checksum)}
          title={valid ? "Gunakan alamat ini" : "Alamat tidak valid"}
        >
          Cek
        </button>
      </div>
      {!raw ? (
        <small className="muted">Contoh: 0xabc...123</small>
      ) : valid ? (
        <small className="ok">Alamat valid: {checksum!.slice(0, 6)}…{checksum!.slice(-4)}</small>
      ) : (
        <small className="err">Alamat tidak valid</small>
      )}
      <div className="hint">Kami tidak menyimpan alamat Anda.</div>
    </div>
  );
}
