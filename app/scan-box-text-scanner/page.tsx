'use client';

import { useEffect } from 'react';
import './scan-box.css';

export default function ScanBoxPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.querySelectorAll('#hero .reveal').forEach((el) => el.classList.add('visible'));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Nav */}
      <nav>
        <div className="nav-brand">
          <img
            src="/scan-box-text-scanner/images/app-icon.png"
            alt="Text Scanner icon"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          Text Scanner
        </div>
        <a className="nav-cta" href="#cta">Download Free</a>
      </nav>

      {/* Hero */}
      <section id="hero">
        <div className="container">
          <div className="reveal">
            <img
              className="hero-icon"
              src="/scan-box-text-scanner/images/app-icon.png"
              alt="Text Scanner"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          <p className="hero-eyebrow reveal reveal-delay-1">Available on iPhone</p>

          <h1 className="reveal reveal-delay-1">
            Scan only what<br />you frame.
          </h1>

          <p className="hero-sub reveal reveal-delay-2">
            Point your camera at any text, drag the focus box over exactly what you need, and copy it in one tap. Entirely on-device. No account. No internet.
          </p>

          <div className="hero-actions reveal reveal-delay-3">
            <a className="btn-primary" href="#cta">
              <svg viewBox="0 0 814 1000" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-107.9c-52.1-73.9-88.3-186.3-88.3-293.4C21 336.8 95 180.9 204.1 110.6c50.9-33.5 117.9-49.1 183.9-49.1 64.7 0 126.4 20.5 172.2 48.5 48.4 29.2 87 71.4 110.6 119.5 6.4 13.8 10.5 27 10.5 27z" />
              </svg>
              Download on App Store
            </a>
            <a className="btn-secondary" href="#how-it-works">See how it works →</a>
          </div>

          {/* CSS phone mockup */}
          <div className="phone-wrap reveal reveal-delay-4">
            <div className="phone-glow"></div>
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="mock-bg-text">
                  <div className="mock-bg-line" style={{ width: '85%' }}></div>
                  <div className="mock-bg-line" style={{ width: '70%' }}></div>
                  <div className="mock-bg-line" style={{ width: '92%' }}></div>
                  <div className="mock-bg-line" style={{ width: '60%' }}></div>
                </div>
                <div className="scan-dim"></div>
                <div className="scan-box">
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                  <div className="scan-line"></div>
                  <div className="mock-text">
                    <div className="mock-line l90"></div>
                    <div className="mock-line l80"></div>
                    <div className="mock-line l60"></div>
                  </div>
                </div>
                <div className="mock-capture-btn">⊙ Capture Text</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem">
        <div className="container">
          <p className="section-label reveal">The real problem</p>
          <h2 className="section-title reveal reveal-delay-1">Copying text with your iPhone<br />shouldn&apos;t be this painful.</h2>
          <p className="section-sub reveal reveal-delay-2">
            You spot something you want to copy. Your iPhone is right there. And yet what follows is a six-step nightmare that ends in frustration more often than not.
          </p>

          <div className="problem-grid">
            {/* Old way */}
            <div className="problem-card reveal reveal-delay-1">
              <div className="problem-card-label label-old">✕ The old way (iOS Camera)</div>
              <div className="problem-steps">
                <div className="problem-step">
                  <div className="step-icon bad">📷</div>
                  <div className="step-text">
                    <strong>Take a photo</strong>
                    <span className="pain">Hope the text is in focus, properly lit, and not at an angle.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon bad">🖼️</div>
                  <div className="step-text">
                    <strong>Open the photo in Photos</strong>
                    <span className="pain">Switch apps. Find the photo. Open it.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon bad">👆</div>
                  <div className="step-text">
                    <strong>Long press and pray it&apos;s not a Live Photo</strong>
                    <span className="pain">Live Photos don&apos;t show the Text button. Start over.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon bad">📝</div>
                  <div className="step-text">
                    <strong>Wait for the &quot;Text&quot; option to appear</strong>
                    <span className="pain">Sometimes it does. Sometimes it doesn&apos;t.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon bad">✋</div>
                  <div className="step-text">
                    <strong>Try to select exactly what you want</strong>
                    <span className="pain">It grabs surrounding text too. Now you&apos;re editing handles.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon bad">✂️</div>
                  <div className="step-text">
                    <strong>Copy, switch app, paste, clean up the mess</strong>
                    <span className="pain">Delete the junk that got dragged in. Finally done.</span>
                  </div>
                </div>
              </div>
              <div className="verdict bad">
                <span>⏱</span>
                <div>
                  <strong>6 steps, 45+ seconds</strong><br />
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>and it still might not work</span>
                </div>
              </div>
            </div>

            {/* New way */}
            <div className="problem-card reveal reveal-delay-2">
              <div className="problem-card-label label-new">✓ With Text Scanner</div>
              <div className="problem-steps">
                <div className="problem-step">
                  <div className="step-icon good">🎯</div>
                  <div className="step-text">
                    <strong>Open Text Scanner</strong>
                    <span className="pain" style={{ color: 'var(--green)' }}>Camera is live instantly. No setup.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon good">⬜</div>
                  <div className="step-text">
                    <strong>Drag the scan box over exactly the text you want</strong>
                    <span className="pain" style={{ color: 'var(--green)' }}>Frame one line, one paragraph, one word — your choice.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon good">👆</div>
                  <div className="step-text">
                    <strong>Tap Capture Text</strong>
                    <span className="pain" style={{ color: 'var(--green)' }}>Only what&apos;s inside the box gets read. Nothing else.</span>
                  </div>
                </div>
                <div className="problem-step">
                  <div className="step-icon good">📋</div>
                  <div className="step-text">
                    <strong>Copy, share, or save — instantly</strong>
                    <span className="pain" style={{ color: 'var(--green)' }}>Clean text, ready to paste. No editing needed.</span>
                  </div>
                </div>
              </div>
              <div className="verdict good" style={{ marginTop: '80px' }}>
                <span>⚡</span>
                <div>
                  <strong>4 steps, under 5 seconds</strong><br />
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>works every single time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works">
        <div className="container">
          <p className="section-label reveal">Simple by design</p>
          <h2 className="section-title reveal reveal-delay-1">Three steps.<br />That&apos;s the whole app.</h2>
          <p className="section-sub reveal reveal-delay-2">No tutorial required. Open it, frame what you want, tap Capture.</p>

          <div className="steps-grid">
            <div className="step-card reveal reveal-delay-1">
              <div className="step-number">1</div>
              <h3>Frame your target</h3>
              <p>A resizable scan box sits on your live camera view. Drag it anywhere. Resize from any corner or edge to fit exactly the text you need — nothing around it.</p>
            </div>
            <div className="step-card reveal reveal-delay-2">
              <div className="step-number">2</div>
              <h3>Tap Capture</h3>
              <p>Text Scanner reads only what&apos;s inside the box using Apple&apos;s Vision framework. In under a second, your text appears — clean and in reading order.</p>
            </div>
            <div className="step-card reveal reveal-delay-3">
              <div className="step-number">3</div>
              <h3>Copy, share, or save</h3>
              <p>Copy to clipboard in one tap, share to any app, or let it save to your local history automatically. Every scan is there waiting when you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" style={{ paddingBottom: '60px' }}>
        <div className="container">
          <p className="section-label reveal">In the app</p>
          <h2 className="section-title reveal reveal-delay-1">Every screen, purpose-built.</h2>
        </div>
        <div className="container" style={{ maxWidth: '100%', padding: '0 24px' }}>
          <div className="screenshots-scroll">
            <div className="screenshot-item reveal reveal-delay-1">
              <div className="screenshot-phone">
                <img
                  src="/scan-box-text-scanner/images/ss1-hero.png"
                  alt="Text Scanner scan box on live camera"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="placeholder">SS1 — Hero<br/>Scan box on camera</div>'; }}
                />
              </div>
              <div className="screenshot-caption">
                Frame exactly what you want
                <span>Drag and resize the scan box</span>
              </div>
            </div>

            <div className="screenshot-item reveal reveal-delay-2">
              <div className="screenshot-phone">
                <img
                  src="/scan-box-text-scanner/images/ss2-result.png"
                  alt="Captured text result screen"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="placeholder">SS2 — Result<br/>Extracted text sheet</div>'; }}
                />
              </div>
              <div className="screenshot-caption">
                Clean text in under a second
                <span>Extracted and ready to use</span>
              </div>
            </div>

            <div className="screenshot-item reveal reveal-delay-3">
              <div className="screenshot-phone">
                <img
                  src="/scan-box-text-scanner/images/ss3-copied.png"
                  alt="Copied confirmation and share options"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="placeholder">SS3 — Copied<br/>Copy &amp; share screen</div>'; }}
                />
              </div>
              <div className="screenshot-caption">
                One tap to copy or share
                <span>Send to any app instantly</span>
              </div>
            </div>

            <div className="screenshot-item reveal reveal-delay-4">
              <div className="screenshot-phone">
                <img
                  src="/scan-box-text-scanner/images/ss4-history.png"
                  alt="Scan history list"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="placeholder">SS4 — History<br/>Scan history list</div>'; }}
                />
              </div>
              <div className="screenshot-caption">
                Every scan saved automatically
                <span>Browse and reuse past captures</span>
              </div>
            </div>

            <div className="screenshot-item reveal reveal-delay-1">
              <div className="screenshot-phone">
                <img
                  src="/scan-box-text-scanner/images/ss5-privacy.png"
                  alt="Privacy onboarding screen"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="placeholder">SS5 — Privacy<br/>Onboarding screen</div>'; }}
                />
              </div>
              <div className="screenshot-caption">
                Completely offline. Completely private.
                <span>No account. Nothing sent anywhere.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="container">
          <p className="section-label reveal">What&apos;s inside</p>
          <h2 className="section-title reveal reveal-delay-1">Everything you need.<br />Nothing you don&apos;t.</h2>

          <div className="features-grid">
            <div className="feature-card featured reveal reveal-delay-1">
              <div className="feature-icon">⬜</div>
              <h3>The Precision Scan Zone</h3>
              <p>Unlike apps that dump the entire camera frame at you, Text Scanner reads only what&apos;s inside your box. Drag it. Resize it from any corner or edge. Frame exactly one price, one paragraph, one serial number. Everything outside is ignored entirely — no junk to clean up.</p>
            </div>

            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">📋</div>
              <h3>One-tap copy</h3>
              <p>Tap Copy and it&apos;s in your clipboard. That&apos;s it.</p>
            </div>

            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">📤</div>
              <h3>Share anywhere</h3>
              <p>Send to Notes, Messages, WhatsApp, Mail — anything with the standard iOS Share Sheet.</p>
            </div>

            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">🕐</div>
              <h3>Scan history</h3>
              <p>Every capture is saved locally. Swipe to delete entries or clear everything at once. Your data never leaves the device.</p>
            </div>

            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon">📴</div>
              <h3>No internet needed</h3>
              <p>OCR runs on-device using Apple Vision. Works on a plane, underground, anywhere.</p>
            </div>

            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">🔐</div>
              <h3>Zero data collected</h3>
              <p>No account. No sign-in. No analytics. Camera frames are processed and immediately discarded.</p>
            </div>

            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">📖</div>
              <h3>Interactive first-launch guide</h3>
              <p>A 3-step coach overlay shows you exactly how to use the scan box. Revisit it any time from History.</p>
            </div>

            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon">🎯</div>
              <h3>Haptic feedback</h3>
              <p>Subtle haptics confirm every capture — a medium tap on press, a success pulse when text is found.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy">
        <div className="container">
          <p className="section-label reveal">Privacy first</p>
          <h2 className="section-title reveal reveal-delay-1">Built to collect nothing.</h2>
          <p className="section-sub reveal reveal-delay-2">
            Most apps tell you they care about privacy. Text Scanner was built so there&apos;s nothing to worry about in the first place.
          </p>

          <div className="privacy-grid">
            <div className="privacy-badge reveal reveal-delay-1">
              <div className="badge-icon">🚫</div>
              <h4>No account</h4>
              <p>Open the app and use it. No email, no password, no sign-in screen.</p>
            </div>
            <div className="privacy-badge reveal reveal-delay-2">
              <div className="badge-icon">📡</div>
              <h4>No internet</h4>
              <p>Zero network requests. Everything runs on your device using Apple&apos;s built-in frameworks.</p>
            </div>
            <div className="privacy-badge reveal reveal-delay-3">
              <div className="badge-icon">🧹</div>
              <h4>Frames discarded instantly</h4>
              <p>Camera frames are used for OCR in real time and immediately thrown away. Nothing is saved as an image.</p>
            </div>
            <div className="privacy-badge reveal reveal-delay-4">
              <div className="badge-icon">📦</div>
              <h4>History stays on-device</h4>
              <p>Scan history lives only in your app&apos;s private folder. Delete it any time. Uninstall and it&apos;s gone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="section-label reveal">What people are saying</p>
          <h2 className="section-title reveal reveal-delay-1">Real people. Real menus.</h2>

          <div className="reviews-grid">
            <div className="review-card reveal reveal-delay-1">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &quot;Was at dinner last night squinting at a tiny handwritten specials board across the room. Just opened this, framed just the board, and had it copied in like 2 seconds 😂 my friend thought I was doing something illegal. Instant 5 stars.&quot;
              </p>
              <div className="review-meta">
                <div className="review-avatar av-blue">S</div>
                <div>
                  <div className="review-name">sarah_m_nyc</div>
                  <div className="review-date">App Store Review · March 2026</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal reveal-delay-2">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &quot;Ok I&apos;ll be honest I thought this was just another scanner app but it&apos;s actually genuinely different. You frame the box FIRST, then you scan. So you only get the text you actually want. Revolutionary? Maybe not. But it should just be built into iOS at this point 🤷&quot;
              </p>
              <div className="review-meta">
                <div className="review-avatar av-orange">J</div>
                <div>
                  <div className="review-name">jo.techskeptic</div>
                  <div className="review-date">App Store Review · March 2026</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal reveal-delay-3">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &quot;I read a lot of physical books and I&apos;ve been wanting something exactly like this for quoting passages in my notes. The scan box is 🤌 — I can grab literally one sentence if I want. No more retyping. No more half-selected text. Finally.&quot;
              </p>
              <div className="review-meta">
                <div className="review-avatar av-green">R</div>
                <div>
                  <div className="review-name">bookworm_raj</div>
                  <div className="review-date">App Store Review · March 2026</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal reveal-delay-1">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &quot;I expense a ton of receipts for work. The old iOS Photos way (take pic → open → long press → fight with Live Text → copy wrong amount 😤) was driving me insane. This app is just better in every single way. The history tab is such a nice bonus.&quot;
              </p>
              <div className="review-meta">
                <div className="review-avatar av-purple">P</div>
                <div>
                  <div className="review-name">finance_pete_d</div>
                  <div className="review-date">App Store Review · March 2026</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal reveal-delay-2">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &quot;Love that there&apos;s literally zero setup. Opens straight to camera, no permission pop-ups on launch, no &apos;create an account to save history&apos; nonsense. Just works. That&apos;s all I wanted. Rare to say that about an app these days.&quot;
              </p>
              <div className="review-meta">
                <div className="review-avatar av-teal">M</div>
                <div>
                  <div className="review-name">minimalist_maya</div>
                  <div className="review-date">App Store Review · March 2026</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal reveal-delay-3">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &quot;Was scanning a nutrition label in the supermarket. Needed just the ingredients, not the entire packaging text. Resized the box to exactly that section and done. No idea how I&apos;d do this with anything else. 10/10 use it literally every week 🛒&quot;
              </p>
              <div className="review-meta">
                <div className="review-avatar av-blue">A</div>
                <div>
                  <div className="review-name">amara_eats</div>
                  <div className="review-date">App Store Review · March 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2 className="reveal">Stop fighting with your camera.<br />Just scan it.</h2>
          <p className="reveal reveal-delay-1">Free. No account. Works instantly.</p>

          <a className="appstore-btn reveal reveal-delay-2" href="https://apps.apple.com/app/text-scanner" target="_blank" rel="noopener">
            <svg viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-107.9c-52.1-73.9-88.3-186.3-88.3-293.4C21 336.8 95 180.9 204.1 110.6c50.9-33.5 117.9-49.1 183.9-49.1 64.7 0 126.4 20.5 172.2 48.5 48.4 29.2 87 71.4 110.6 119.5 6.4 13.8 10.5 27 10.5 27z" />
            </svg>
            Download on the App Store
          </a>

          <p className="cta-note reveal reveal-delay-3">iPhone · iOS 15 or later · Free</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-links">
            <a href="https://www.prateekrathore.com/privacy-policy/">Privacy Policy</a>
            <a href="mailto:mail@prateekrathore.com">Contact</a>
            <a href="https://www.prateekrathore.com">prateekrathore.com</a>
          </div>
          <p>© 2026 Prateek Rathore. Text Scanner is an independent app not affiliated with Apple Inc.</p>
        </div>
      </footer>
    </>
  );
}
