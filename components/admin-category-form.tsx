import type { Category } from "@/lib/types";

const inputClass = "focus-ring min-h-11 w-full rounded-xl border border-lilac-100 bg-white px-3 text-sm text-ink outline-none placeholder:text-muted/60";
const labelClass = "mb-1.5 block text-xs font-black text-ink";

export function AdminCategoryForm({ category, action }: { category?: Category; action: (formData: FormData) => void | Promise<void> }) {
  return (
    <form action={action} className="space-y-5">
      {category ? <input type="hidden" name="id" value={category.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category-name" className={labelClass}>Nama kategori</label>
          <input id="category-name" name="name" required defaultValue={category?.name} className={inputClass} placeholder="Fashion & Style" />
        </div>
        <div>
          <label htmlFor="category-slug" className={labelClass}>Slug</label>
          <input id="category-slug" name="slug" required defaultValue={category?.slug} className={inputClass} placeholder="fashion-style" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="category-description" className={labelClass}>Deskripsi</label>
          <textarea id="category-description" name="description" required defaultValue={category?.description} className={`${inputClass} min-h-24 py-3`} placeholder="Deskripsi singkat kategori" />
        </div>
        <div>
          <label htmlFor="category-icon" className={labelClass}>Icon key</label>
          <select id="category-icon" name="iconKey" defaultValue={category?.iconKey ?? "sparkles"} className={inputClass}>
            <option value="dress">dress</option>
            <option value="beauty">beauty</option>
            <option value="sparkles">sparkles</option>
            <option value="home">home</option>
            <option value="activity">activity</option>
          </select>
        </div>
        <div>
          <label htmlFor="category-accent" className={labelClass}>Accent color</label>
          <input id="category-accent" name="accentColor" defaultValue={category?.accentColor ?? "#eee5ff"} className={inputClass} />
        </div>
        <div>
          <label htmlFor="category-sort" className={labelClass}>Urutan</label>
          <input id="category-sort" name="sortOrder" type="number" defaultValue={category?.sortOrder ?? 0} className={inputClass} />
        </div>
        <div>
          <label htmlFor="category-status" className={labelClass}>Status</label>
          <select id="category-status" name="status" defaultValue={category?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      <button type="submit" className="focus-ring min-h-12 w-full rounded-2xl bg-ink px-5 text-sm font-black text-white transition hover:bg-lilac-600">{category ? "Simpan perubahan" : "Simpan kategori"}</button>
    </form>
  );
}
