export default function FormInput({
  label,
  type = "text",
  placeholder,
  icon,
  options,
  value,
  onChange,
  name,
  accept,
  disabled = false,
}) {
  const baseClasses =
    "w-full h-14 px-6 rounded-xl bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline-variant transition-all outline-none";

  if (type === "select") {
    return (
      <div className="group">
        <label className="block text-sm font-semibold text-secondary mb-2 px-2">
          {label}
        </label>
        <select
          className={`${baseClasses} appearance-none cursor-pointer`}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="relative group h-[280px] md:h-[400px] border-2 border-dashed border-outline-variant hover:border-primary/40 bg-surface-container-lowest rounded-2xl flex flex-col items-center justify-center p-8 md:p-12 text-center transition-all cursor-pointer overflow-hidden">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={onChange}
          name={name}
          accept={accept}
          disabled={disabled}
        />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
          <span
            className="material-symbols-outlined text-4xl"
            style={{ fontVariationSettings: "'wght' 600" }}
          >
            cloud_upload
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Drag files here</h3>
        <p className="text-on-surface-variant text-sm mb-6">
          Support for PDF only up to 5MB.
        </p>
        <label className="px-8 py-3 bg-surface-container-high rounded-full font-semibold text-secondary hover:bg-surface-container-highest transition-colors cursor-pointer pointer-events-none">
          Browse Files
        </label>
      </div>
    );
  }

  return (
    <div className="group">
      <label className="block text-sm font-semibold text-secondary mb-2 px-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">
              {icon}
            </span>
          </div>
        )}
        <input
          className={`${baseClasses} ${icon ? "pl-12" : ""}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
