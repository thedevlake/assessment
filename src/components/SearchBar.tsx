type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto sm:mx-0">
      <input
        className="w-full p-3 rounded-md border shadow-sm outline-none focus:ring-1 focus:ring-pink-400 transition"
        placeholder="Search images (e.g school, flowers, sunset)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
