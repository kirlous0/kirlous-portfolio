# GitHub Integration - دليل الاستخدام

## ✅ الميزات المضافة

### 1. جلب Repositories من GitHub
- أدخل **GitHub username** → يجيب كل الـ repos العامة
- عرض معلومات أساسية: الاسم، اللغة، الوصف

### 2. اختيار Repository
- dropdown لاختيار repo معين
- عرض معلومات تفصيلية:
  - ⭐ Stars
  - 🍴 Forks
  - 📝 License
  - 🏷️ Topics
  - 💻 Languages مع النسب المئوية
  - 📅 Last Updated
  - 📖 README content

### 3. Auto-fill البيانات
لما تختار repo، البيانات دي بتتملأ تلقائياً:
- **Source URL**: رابط GitHub repo
- **Summary**: وصف الـ repo
- **Technologies**: Topics من الـ repo
- **Category**: اللغة الأساسية للـ repo

### 4. جلب Vercel Preview URL
- زرار "Fetch Vercel Preview URL"
- يجيب آخر production deployment من Vercel
- يملأ حقل **Live URL** تلقائياً

---

## 🚀 خطوات الاستخدام

### الخطوة 1: إنشاء Vercel Token

عشان الـ Vercel integration يشتغل، محتاج تضيف `VERCEL_TOKEN` في environment variables:

1. روح على: https://vercel.com/account/tokens
2. اعمل **Create Token**
3. اختار:
   - **Name**: `portfolio-app`
   - **Scope**: Personal Account
   - **Expiration**: No Expiration (أو 1 سنة)
4. انسخ الـ token

### الخطوة 2: إضافة Token في Vercel

#### الطريقة الأولى: من Vercel Dashboard

1. روح على: https://vercel.com/kirlous-s-projects/kirlous-portfolio/settings/environment-variables
2. أضف variable جديد:
   - **Key**: `VERCEL_TOKEN`
   - **Value**: (الصق الـ token)
   - **Environment**: Production, Preview, Development
3. اضغط **Save**

#### الطريقة الثانية: من Vercel CLI

```bash
vercel env add VERCEL_TOKEN
# الصق الـ token
# اختار: Production, Preview, Development
vercel --prod
```

### الخطوة 3: Redeploy

بعد إضافة الـ token، محتاج تعمل redeploy:

```bash
vercel --prod
```

أو من Vercel Dashboard:
1. روح على Deployments
2. اضغط على آخر deployment
3. اضغط **Redeploy**

---

## 📝 استخدام GitHub Integration

### 1. افتح Admin Dashboard

```
https://kirlous-portfolio-ten.vercel.app/admin/login
```

### 2. أنشئ مشروع جديد

اضغط **New Project**

### 3. أدخل GitHub Username

في قسم **GitHub Integration**:
- أدخل username: `kirlous0`
- اضغط **Fetch Repos**

### 4. اختر Repository

من الـ dropdown:
- اختر repo معين (مثلاً: `kirlous-portfolio`)
- البيانات هتملأ تلقائياً

### 5. جلب Vercel Preview URL

- اضغط **Fetch Vercel Preview URL**
- الـ Live URL هيتملأ تلقائياً

### 6. راجع وعدّل

- شوف البيانات اللي ات filled تلقائياً
- عدّل أي حاجة محتاجة تعديل
- أكمل باقي الـ tabs (English, Arabic, Image, Publishing)

### 7. احفظ المشروع

- **Save Draft**: حفظ كمسودة
- **Save & Publish**: حفظ ونشر

---

## 🎯 مثال عملي

### إضافة مشروع "Kirlous Portfolio":

1. **GitHub Username**: `kirlous0`
2. **Fetch Repos** → يظهر قائمة
3. **Select Repository**: `kirlous-portfolio`
   - Auto-fill:
     - Source URL: `https://github.com/kirlous0/kirlous-portfolio`
     - Summary: (من repo description)
     - Technologies: `nextjs, typescript, tailwindcss, supabase`
     - Category: `TypeScript`
4. **Fetch Vercel Preview URL**
   - Auto-fill:
     - Live URL: `https://kirlous-portfolio-ten.vercel.app`
5. **أكمل البيانات**:
   - Title (English): `Kirlous Portfolio`
   - Title (Arabic): `بورتفوليو كيرلس`
   - Overview, Problem, Solution, etc.
6. **Save & Publish**

---

## 🔧 Troubleshooting

### المشكلة: "Failed to fetch repos"

**السبب**: GitHub username غير موجود أو مفيش repos عامة

**الحل**:
- تأكد من الـ username صحيح
- تأكد إن عندك repos عامة (public)

### المشكلة: "Failed to fetch Vercel preview URL"

**السبب**: 
- VERCEL_TOKEN مش موجود في environment variables
- أو الـ project مش موجود على Vercel
- أو مفيش production deployments

**الحل**:
- أضف VERCEL_TOKEN (شوف الخطوات فوق)
- تأكد إن الـ project موجود على Vercel
- تأكد إن عندك production deployment واحد على الأقل

### المشكلة: "VERCEL_TOKEN not configured"

**السبب**: الـ token مش موجود في environment variables

**الحل**:
- أضف VERCEL_TOKEN في Vercel Dashboard (شوف الخطوات فوق)
- اعمل redeploy بعد إضافة الـ token

---

## 🎨 البيانات اللي بتتملأ تلقائياً

| الحقل | المصدر | قابل للتعديل |
|-------|--------|--------------|
| Source URL | GitHub repo URL | ✅ |
| Live URL | Vercel deployment URL | ✅ |
| Summary | GitHub repo description | ✅ |
| Technologies | GitHub repo topics | ✅ |
| Category | GitHub primary language | ✅ |

**ملاحظة**: كل البيانات اللي بتتملأ تلقائياً قابلة للتعديل. تقدر تغيرها أو تضيف عليها قبل الحفظ.

---

## 📊 المعلومات المعروضة من GitHub

### معلومات أساسية:
- Name
- Description
- Language
- Stars ⭐
- Forks 🍴

### معلومات تفصيلية:
- License
- Topics
- Languages مع النسب
- Last Updated
- Homepage (لو موجود)
- GitHub URL

### معلومات إضافية (في الـ background):
- README content
- Watchers
- Open Issues
- Created At
- Pushed At
- Default Branch
- Has Pages
- Is Private

---

## 🔐 الأمان

- ✅ كل الـ API routes محمية بـ authentication
- ✅ بس المستخدمين المسجلين دخول يقدروا يستخدموا الـ integration
- ✅ VERCEL_TOKEN مش بيتعرض في الـ frontend
- ✅ GitHub API بيستخدم public data فقط (مفيش private repos)

---

## 🚀 Future Enhancements

- [ ] اختيار multiple repos مرة واحدة
- [ ] Import README as project overview
- [ ] Auto-detect project type from repo structure
- [ ] Fetch deployment status from Vercel
- [ ] Show GitHub Actions status
- [ ] Auto-update project info when repo changes

---

## 📞 الدعم

لو عندك أي مشكلة أو سؤال:
- راجع الـ Troubleshooting فوق
- تأكد من الـ environment variables
- جرب تعمل redeploy

---

**تم بحمد الله! 🎉**
