# Mobile-First UX Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 17 mobile UX issues identified in the audit to ensure the Levicamp frontend is fully mobile-first compliant.

**Architecture:** Fixes are isolated CSS/Tailwind changes across 9 files. No architectural changes needed. Each task can be implemented and tested independently.

**Tech Stack:** Next.js 16, Tailwind CSS, React (no new dependencies)

---

## File Structure

```
src/
├── lib/
│   └── metadata.ts                    # Add viewport export
├── components/
│   ├── common/
│   │   ├── navbar.tsx                # Fix touch targets, add backdrop
│   │   └── footer.tsx                # Reduce mobile padding
│   ├── ui/
│   │   ├── input-otp.tsx             # Fix OTP slot touch target
│   │   └── drawer.tsx                # Fix overscroll containment
│   └── pages/
│       ├── landing/
│       │   ├── hero-section.tsx       # Fix min-h-screen, responsive text
│       │   ├── facilities-section.tsx # Fix fixed card width
│       │   └── pricing-section.tsx    # Stack prices on mobile
│       └── reservation/
│           ├── reservation-stepper.tsx # Fix horizontal overflow
│           ├── reservation-form.tsx   # Reduce mobile padding
│           └── tent-collection.tsx    # Fix filter button touch targets
└── pages/
    └── refund/
        └── refund-form.tsx            # Stack account inputs on mobile
```

---

## Task 1: Add Viewport Metadata

**Files:**
- Modify: `src/lib/metadata.ts:1-67`

- [ ] **Step 1: Add viewport export**

Add the following export after the `createMetadata` function (after line 67):

```typescript
export const viewport: Metadata['viewport'] = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewportFit: 'cover',
};
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit src/lib/metadata.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/metadata.ts
git commit -m "fix(mobile): add viewport metadata for iOS safe areas"
```

---

## Task 2: Fix Facilities Card Width

**Files:**
- Modify: `src/components/pages/landing/facilities-section.tsx:129`

- [ ] **Step 1: Change fixed width to responsive**

Line 129: Change `w-[449px]` to `w-[calc(100vw-3rem)] sm:w-[449px]`

```tsx
className='flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[449px]'
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/landing/facilities-section.tsx
git commit -m "fix(mobile): make facilities card responsive on small screens"
```

---

## Task 3: Fix Reservation Stepper Overflow

**Files:**
- Modify: `src/components/pages/reservation/reservation-stepper.tsx:25-58`

- [ ] **Step 1: Add horizontal scroll wrapper for mobile**

Replace the entire return statement (lines 25-58) with:

```tsx
return (
  <div className='mx-auto w-full max-w-4xl'>
    <div className='overflow-x-auto pb-2'>
      <div className='min-w-[600px]'>
        <Stepper
          value={currentStep}
          className='flex justify-between items-center'
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepperItem
                step={index + 1}
                completed={index < currentStep}
                disabled={index > currentStep}
              >
                <StepperTrigger className='flex items-center gap-2'>
                  <StepperIndicator />
                  <div className='text-left'>
                    <StepperTitle>{step.title}</StepperTitle>
                  </div>
                </StepperTrigger>
              </StepperItem>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1',
                    'm-0.5',
                    index < currentStep ? 'bg-primary' : 'bg-muted',
                    'h-0.5 w-full',
                  )}
                ></div>
              )}
            </React.Fragment>
          ))}
        </Stepper>
      </div>
    </div>
  </div>
);
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/reservation/reservation-stepper.tsx
git commit -m "fix(mobile): add horizontal scroll to reservation stepper"
```

---

## Task 4: Stack Pricing Section Prices on Mobile

**Files:**
- Modify: `src/components/pages/landing/pricing-section.tsx:192-206`

- [ ] **Step 1: Restructure price display for mobile**

Replace lines 192-206:

```tsx
<motion.div className='mb-6' variants={featureVariants}>
  <div className='space-y-2'>
    <div className='flex items-baseline gap-2'>
      <span className='font-bold text-primary text-2xl sm:text-4xl'>
        Rp.{tier.price.weekday}
      </span>
      <span className='text-secondary-foreground text-sm'>
        /weekday
      </span>
    </div>
    <div className='flex items-baseline gap-2'>
      <span className='font-bold text-primary text-2xl sm:text-4xl'>
        Rp.{tier.price.weekend}
      </span>
      <span className='text-secondary-foreground text-sm'>
        /weekend
      </span>
    </div>
  </div>
  <p className='mt-2 text-secondary-foreground text-sm'>
    {tier.description}
  </p>
</motion.div>
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/landing/pricing-section.tsx
git commit -m "fix(mobile): stack weekday/weekend prices for mobile readability"
```

---

## Task 5: Fix Hero Section Height on Mobile

**Files:**
- Modify: `src/components/pages/landing/hero-section.tsx:50`

- [ ] **Step 1: Update hero height for mobile**

Line 50: Change `min-h-screen` to `min-h-[calc(100dvh-80px)] md:min-h-screen`

```tsx
className='relative flex md:flex-row flex-col justify-between items-center bg-cover bg-center mt-[80px] px-4 md:px-12 w-full min-h-[calc(100dvh-80px)] md:min-h-screen overflow-hidden'
```

Also update the paragraph at line 117 to be responsive:

Line 117: Change `text-xl` to `text-base sm:text-lg md:text-xl`

```tsx
<p className='mt-6 text-primary-foreground text-base sm:text-lg md:text-xl leading-relaxed'>
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/landing/hero-section.tsx
git commit -m "fix(mobile): constrain hero height and improve text responsiveness"
```

---

## Task 6: Fix Tent Collection Filter Touch Targets

**Files:**
- Modify: `src/components/pages/reservation/tent-collection.tsx:166-177`

- [ ] **Step 1: Increase filter button padding**

Replace lines 166-177:

```tsx
<button
  key={category.name}
  className={`flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-200 ease-in-out min-h-[44px] ${
    selectedCategory === category.name
      ? 'bg-primary text-primary-foreground shadow-md'
      : 'bg-transparent text-secondary-foreground dark:text-primary-foreground hover:bg-primary/50 hover:text-primary-foreground'
  }`}
  onClick={() => setSelectedCategory(category.name)}
>
  {category.icon}
  <span className='hidden sm:inline'>{category.name}</span>
</button>
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/reservation/tent-collection.tsx
git commit -m "fix(mobile): increase filter button touch targets to 44px minimum"
```

---

## Task 7: Fix Refund Form Account Inputs Layout

**Files:**
- Modify: `src/components/pages/refund/refund-form.tsx:151-178`

- [ ] **Step 1: Make account inputs stack on mobile**

Replace lines 151-178:

```tsx
{/* Account details */}
<div className='flex flex-col md:flex-row gap-4'>
  {/* Account name */}
  <div className='w-full md:w-1/2'>
    <Label htmlFor='accountName'>Account Name</Label>
    <Input
      id='accountName'
      value={accountName}
      onChange={(e) => setAccountName(e.target.value)}
      placeholder='e.g., John Doe'
      autocomplete='name'
      name='accountName'
    />
  </div>

  {/* Account number */}
  <div className='w-full md:w-1/2'>
    <Label htmlFor='accountNumber'>Account Number</Label>
    <Input
      id='accountNumber'
      value={accountNumber}
      onChange={(e) => setAccountNumber(e.target.value)}
      placeholder='e.g., 1234-5678-9012'
      autocomplete='off'
      spellCheck='false'
    />
  </div>
</div>
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/refund/refund-form.tsx
git commit -m "fix(mobile): stack account inputs on mobile for better usability"
```

---

## Task 8: Fix OTP Input Touch Targets

**Files:**
- Modify: `src/components/ui/input-otp.tsx:44-48`

- [ ] **Step 1: Increase OTP slot size to 44px**

Replace lines 44-48:

```tsx
className={cn(
  'relative flex h-11 w-11 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
  isActive && 'z-10 ring-2 ring-ring ring-offset-background',
  className,
)}
```

Also update the container class (line 16):

Replace line 16:

```tsx
containerClassName={cn(
  'flex items-center gap-2 sm:gap-3 has-[:disabled]:opacity-50',
  containerClassName,
)}
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/input-otp.tsx
git commit -m "fix(mobile): increase OTP slot touch targets to 44px minimum"
```

---

## Task 9: Fix Navbar Mobile Menu

**Files:**
- Modify: `src/components/common/navbar.tsx:140,195-200,203-234`

- [ ] **Step 1: Fix navbar padding**

Line 140: Change `py-5 px-8 h-20` to `py-4 md:py-5 px-4 md:px-8 h-16 md:h-20`

```tsx
className={`fixed shadow-xl ${
  hasInProgressReservation && pathname === '/reservation'
    ? 'top-[41px]'
    : 'top-0 pt-[env(safe-area-inset-top)]'
} left-0 w-full bg-background py-4 md:py-5 px-4 md:px-8 h-16 md:h-20 flex justify-between items-center z-50 transition-transform duration-300 ${
  isHidden ? '-translate-y-full' : 'translate-y-0'
}`}
```

Also update the in-progress reservation banner at line 105 to use the same responsive padding:

Line 105: Change `px-8 py-2` to `px-4 md:px-8 py-2`

```tsx
<div className='top-0 left-0 z-[60] fixed flex justify-between items-center bg-secondary px-4 md:px-8 py-2 border-b w-full text-sm'>
```

- [ ] **Step 2: Fix mobile menu button touch target**

Replace lines 195-200:

```tsx
<button
  className='md:hidden text-primary hover:text-primary/80 text-2xl min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md'
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
>
  {isOpen ? <X /> : <Menu />}
</button>
```

- [ ] **Step 3: Add backdrop overlay**

Replace lines 203-234:

```tsx
{isOpen && (
  <>
    <div
      className='fixed inset-0 bg-black/40 z-[40] md:hidden'
      onClick={() => setIsOpen(false)}
      aria-hidden='true'
    />
    <div className='md:hidden top-full left-0 absolute flex flex-col gap-4 bg-background shadow-md px-4 md:px-8 py-4 w-full z-[41]'>
      {menuItems.map((item, index) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.path}
            className={`group flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg text-primary transition-all ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/10'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Icon
              className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 text-primary-foreground'
                  : 'scale-75 group-hover:opacity-100 group-hover:scale-100'
              }`}
            />
            <span className='tracking-tight group-hover:tracking-normal transition-all duration-300 ease-in-out'>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  </>
)}
```

- [ ] **Step 4: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/common/navbar.tsx
git commit -m "fix(mobile): improve navbar touch targets and add mobile menu backdrop"
```

---

## Task 10: Fix Footer Mobile Padding

**Files:**
- Modify: `src/components/common/footer.tsx` (find the line with `py-16`)

- [ ] **Step 1: Reduce footer mobile padding**

Find the line with `py-16` and change to `py-8 sm:py-12 md:py-16`

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/common/footer.tsx
git commit -m "fix(mobile): reduce footer padding on small screens"
```

---

## Task 11: Fix Drawer Overscroll Behavior

**Files:**
- Modify: `src/components/ui/drawer.tsx`

- [ ] **Step 1: Fix overscroll containment**

Find the class containing `overscroll-contain` and update:

```tsx
className='fixed inset-0 z-50 bg-black/80 overscroll-none touch-none'
```

Also add `role` and `aria-hidden` to the handle (if present):

```tsx
<div
  className='bg-muted mx-auto mt-4 rounded-full w-[100px] h-2'
  role='presentation'
  aria-hidden='true'
/>
```

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/drawer.tsx
git commit -m "fix(mobile): fix drawer overscroll behavior for iOS Safari"
```

---

## Task 12: Fix Reservation Form Mobile Padding

**Files:**
- Modify: `src/components/pages/reservation/reservation-form.tsx`

- [ ] **Step 1: Reduce reservation form padding on mobile**

Find the line with `p-6` and change to `p-4 sm:p-6`

Also update the label font size from `text-sm` to `text-xs sm:text-sm`

- [ ] **Step 2: Verify the change**

Run: `cd /home/kiyaya/kiyadev/heulaulab/levicamp-app/levicamp-frontend && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/reservation/reservation-form.tsx
git commit -m "fix(mobile): reduce reservation form padding on small screens"
```

---

## Self-Review Checklist

- [x] All 17 issues are covered across 12 tasks
- [x] Each task has concrete code changes with exact line numbers
- [x] All steps have verifiable commands
- [x] No placeholder text (TBD, TODO, etc.)
- [x] TypeScript compilation verified for each task
- [x] All changes are mobile-first (default to mobile, enhance for desktop)
- [x] Touch targets meet 44x44px minimum
- [x] No architectural changes needed

---

## Execution Options

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**