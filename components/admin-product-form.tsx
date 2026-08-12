import type { Product, Category } from "@/lib/types";
import { ImageUploadField } from "@/components/image-upload-field";

const inputClass = "focus-ring min-h-11 w-full rounded-xl border border-lilac-100 bg-white px-3 text-sm text-ink outline-none placeholder:text-muted/60";
const labelClass = "mb-1.5 block text-xs font-black text-ink";

export function AdminProductForm({ categories, product, action }: { categories: Category[]; product?: Product; action: (formData: FormData) => void | Promise<void> }) {
  const imagePath = product?.images[0]?.storagePath;
  return (
    <form action={action} className="space-y-5">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="product-name" className={labelClass}>Nama produk</label>
          <input id="product-name" name="name" required defaultValue={product?.name} className={inputClass} placeholder="Contoh: Tas bahu minimalis" />
        </div>
        <div>
          <label htmlFor="product-slug" className={labelClass}>Slug</label>
          <input id="product-slug" name="slug" required defaultValue={product?.slug} className={inputClass} placeholder="tas-bahu-minimalis" />
        </div>
        <div>
          <label htmlFor="product-category" className={labelClass}>Kategori</label>
          <select id="product-category" name="categoryId" required defaultValue={product?.categoryId ?? categories[0]?.id} className={inputClass}>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="product-short" className={labelClass}>Deskripsi singkat</label>
          <input id="product-short" name="shortDescription" required defaultValue={product?.shortDescription} className={inputClass} placeholder="Satu kalimat yang menjelaskan daya tarik produk" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="product-description" className={labelClass}>Deskripsi</label>
          <textarea id="product-description" name="description" required defaultValue={product?.description} className={`${inputClass} min-h-28 py-3`} placeholder="Kenapa produk ini masuk kurasi Hanabel?" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="product-highlights" className={labelClass}>Highlight manfaat <span className="font-normal text-muted">(satu per baris)</span></label>
          <textarea id="product-highlights" name="highlights" required defaultValue={product?.highlights.join("\n")} className={`${inputClass} min-h-28 py-3`} placeholder={'Tekstur ringan\nMudah dipadukan\nCocok untuk daily'} />
        </div>
        <div>
          <label htmlFor="product-badge" className={labelClass}>Badge <span className="font-normal text-muted">(opsional)</span></label>
          <input id="product-badge" name="badge" defaultValue={product?.badge} className={inputClass} placeholder="Pilihan / Baru / Favorit" />
        </div>
        <div>
          <label htmlFor="product-status" className={labelClass}>Status</label>
          <select id="product-status" name="status" defaultValue={product?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="product-affiliate" className={labelClass}>Link affiliate Shopee</label>
          <input id="product-affiliate" name="affiliateUrl" type="url" required defaultValue={product?.affiliateUrl} className={inputClass} placeholder="https://shopee.co.id/..." />
          <p className="mt-1 text-[0.68rem] text-muted">Hanya domain Shopee yang diizinkan.</p>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Cover produk</label>
          <ImageUploadField defaultValue={imagePath} />
        </div>
        <label className="flex min-h-11 items-center gap-3 text-sm font-bold text-ink sm:col-span-2">
          <input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured} className="h-4 w-4 accent-[#9855d8]" />
          Tampilkan di Pilihan Hanabel
        </label>
      </div>
      <button type="submit" className="focus-ring min-h-12 w-full rounded-2xl bg-ink px-5 text-sm font-black text-white transition hover:bg-lilac-600">{product ? "Simpan perubahan" : "Simpan produk"}</button>
    </form>
  );
}
