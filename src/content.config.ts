import { defineCollection, z } from 'astro:content';
// 1. นำเข้า glob จาก astro/loaders เพิ่มเข้ามา
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    // 2. ถ้ามีคำว่า type: 'content' ให้ลบทิ้งไปเลยครับ แล้วใส่บรรทัด loader ด้านล่างนี้แทน
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            
            // --- (FIX 1) แก้ไขตามไฟล์ .md ของคุณ ---
            description: z.string().optional(), // <-- ทำให้เป็น .optional() (เพราะบางไฟล์ไม่มี)
            date: z.coerce.date(), // <-- (สำคัญ) เปลี่ยนจาก pubDate เป็น date
            
            // --- (FIX 2) เพิ่ม Field ที่เราคุยกัน ---
            categories: z.array(z.string()).optional(), // <-- ทำให้เป็น Array (และ .optional())
            lang: z.enum(['en', 'th']),
            translationKey: z.string().optional(),

            // --- (KEEP) เก็บของเดิมจาก Template ไว้ (และทำให้ .optional() เพื่อความปลอดภัย) ---
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
            coverImage: z.string().optional(), // (เผื่อไฟล์ .md ของคุณมี field นี้)
        }),
});

export const collections = {
  'blog': blogCollection, // ชื่อต้องตรงกับโฟลเดอร์
};