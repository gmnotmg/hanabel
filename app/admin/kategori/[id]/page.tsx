import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminCategoryForm } from "@/components/admin-category-form";
import { updateCategory } from "@/app/admin/actions";
import { getAdminCategories } from "@/lib/admin-repository";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/config";
import { AdminSetupNotice } from "@/components/admin-setup-notice";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured) return <AdminSetupNotice />;
  await requireAdmin();
  const { id } = await params;
  const categories = await getAdminCategories();
  const category = categories.find((item) => item.id === id);
  if (!category) notFound();
  return <div className="mx-auto max-w-3xl space-y-7"><Link href="/admin/kategori" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700"><ArrowLeft aria-hidden="true" size={17} /> Kembali ke kategori</Link><section className="surface-card p-6 sm:p-8"><p className="eyebrow">Edit category</p><h1 className="mt-1 text-2xl font-black tracking-tight text-ink">{category.name}</h1><div className="mt-6"><AdminCategoryForm category={category} action={updateCategory} /></div></section></div>;
}
