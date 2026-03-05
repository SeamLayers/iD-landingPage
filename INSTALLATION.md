# Installation & Testing Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit http://localhost:5173 to see your landing page.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## ✅ Verification Checklist

After starting the dev server, verify these improvements:

### Performance
- [ ] Initial load is fast (< 2 seconds)
- [ ] Smooth scrolling throughout the page
- [ ] Animations run at 60fps
- [ ] No layout shifts during load

### Functionality
- [ ] Hero section loads immediately
- [ ] Other sections lazy load as you scroll
- [ ] All buttons are clickable and responsive
- [ ] Marquee animation is smooth
- [ ] 3D card effect works on hover
- [ ] Step animations in "How It Works" trigger on scroll

### Accessibility
- [ ] Tab navigation works properly
- [ ] All buttons have visible focus states
- [ ] Screen reader announcements are clear
- [ ] Keyboard shortcuts work

### Browser Testing
- [ ] Chrome/Edge ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Mobile browsers ✓

## 📊 Performance Testing

### Run Lighthouse Audit
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Performance" + "Accessibility" + "Best Practices" + "SEO"
4. Click "Analyze page load"
5. Verify scores are 90+

### Check Core Web Vitals
Open the browser console and you'll see performance metrics logged:
- **LCP** (Largest Contentful Paint): Should be < 2.5s
- **FID** (First Input Delay): Should be < 100ms
- **CLS** (Cumulative Layout Shift): Should be < 0.1

## 🐛 Troubleshooting

### Issue: TypeScript errors in IDE
**Solution**: These are type-only errors that won't affect runtime. They'll be resolved when you install dependencies.

### Issue: Animations are choppy
**Solution**: Make sure you're using a GPU-accelerated browser and hardware acceleration is enabled.

### Issue: Build fails
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Port 5173 is already in use
**Solution**: Change the port in vite.config.ts or kill the process using that port.

## 📝 Changes Made

See [PERFORMANCE_REPORT.md](PERFORMANCE_REPORT.md) for a comprehensive list of all improvements and bug fixes.

## 🎯 Production Deployment

Before deploying to production:

1. ✅ Run `npm run build`
2. ✅ Test the production build with `npm run preview`
3. ✅ Run Lighthouse audit
4. ✅ Test on real mobile devices
5. ✅ Verify all environment variables are set
6. ✅ Set up error tracking (Sentry, LogRocket, etc.)
7. ✅ Configure CDN for static assets
8. ✅ Enable Brotli/Gzip compression on server

## 🔧 Development Tips

- Use React DevTools Profiler to identify performance bottlenecks
- Monitor bundle size with `npx vite-bundle-visualizer`
- Use Chrome Performance tab to record runtime performance
- Test with Network throttling to simulate slow connections

## 📞 Support

For questions or issues, refer to:
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Motion Documentation](https://motion.dev)
