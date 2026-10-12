import { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import { ArrowLink, BetaBanner, DemoLink, FeatureGrid, Layout, ResponsiveImage, SplitSection, StoryGrid } from './components';
import { comparison, plans, stories } from './data';
import { getPrice, toggleBilling, type BillingPeriod } from './pricing';
import s from './App.module.css';

function Home() {
  return <>
    <SplitSection title="Create and share your photo stories." image="create-and-share" alt="A photographer standing on a jetty overlooking a misty lake" dark homeHero>
      <p>Photosnap is a platform for photographers and visual storytellers. We make it easy to share photos, tell stories and connect with others.</p><ArrowLink light>Get an invite</ArrowLink>
    </SplitSection>
    <SplitSection title="Beautiful stories every time" image="beautiful-stories" alt="A laptop displaying photographs on a creative workspace" reverse>
      <p>We provide design templates to ensure your stories look terrific. Easily add photos, text, embed maps and media from other networks. Then share your story with everyone.</p><ArrowLink to="/stories">View the stories</ArrowLink>
    </SplitSection>
    <SplitSection title="Designed for everyone" image="designed-for-everyone" alt="A photographer working with a professional camera">
      <p>Photosnap can help you create stories that resonate with your audience. Our tool is designed for photographers of all levels, brands, businesses you name it.</p><ArrowLink to="/stories">View the stories</ArrowLink>
    </SplitSection>
    <StoryGrid items={stories.slice(0, 4)} /><FeatureGrid />
  </>;
}

function Stories() {
  return <>
    <section className={s.featuredStory}>
      <ResponsiveImage className={s.featuredImage} section="stories" name="moon-of-appalacia" alt="A full moon over the layered Appalachian mountains at dusk" eager />
      <div className={s.featuredCopy}>
        <p className={s.eyebrow}>Last month’s featured story</p><h1>Hazy full moon of Appalachia</h1>
        <p className={s.storyByline}><time dateTime="2020-03-02">March 2nd 2020</time><span>by John Appleseed</span></p>
        <p className={s.featuredDescription}>The dissected plateau area, while not actually made up of geological mountains, is popularly called “mountains,” especially in eastern Kentucky and West Virginia, and while the ridges are not high, the terrain is extremely rugged.</p>
        <ArrowLink light>Read the story</ArrowLink>
      </div>
    </section><StoryGrid items={stories} dates />
  </>;
}

function Features() {
  return <>
    <SplitSection title="Features" image="hero" section="features" alt="A photographer framing a shot outdoors" dark hero><p>We make sure all of our features are designed to be loved by every aspiring and even professional photographer who wanted to share their stories.</p></SplitSection>
    <FeatureGrid all /><BetaBanner />
  </>;
}

function Comparison() {
  return <section className={s.comparison} aria-labelledby="compare-title">
    <h2 id="compare-title">Compare</h2>
    <table role="table"><caption className={s.srOnly}>Compare features included in the Basic, Pro and Business plans</caption>
      <thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader">The features</th>{plans.map(plan => <th scope="col" role="columnheader" key={plan.name}>{plan.name}</th>)}</tr></thead>
      <tbody role="rowgroup">{comparison.map(feature => <tr role="row" key={feature.name}><th scope="row" role="rowheader">{feature.name}</th>{feature.availability.map((available, index) => <td role="cell" key={plans[index].name}><span className={s.mobilePlan} aria-hidden="true">{plans[index].name}</span>{available ? <img src="/pricing/desktop/check.svg" width="18" height="15" alt="Included" /> : <span className={s.srOnly}>Not included</span>}</td>)}</tr>)}</tbody>
    </table>
  </section>;
}

function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  return <>
    <SplitSection title="Pricing" image="hero" section="pricing" alt="A photographer silhouetted against a colorful sunset" dark hero><p>Create your stories. Photosnap is a platform for photographers and visual storytellers. It’s the simple way to create and share your photos.</p></SplitSection>
    <section className={s.pricing} aria-label="Subscription plans">
      <div className={s.billing}><span className={period === 'monthly' ? s.selectedPeriod : ''}>Monthly</span><button type="button" className={`${s.billingSwitch} ${period === 'yearly' ? s.yearly : ''}`} role="switch" aria-label="Yearly billing" aria-checked={period === 'yearly'} onClick={() => setPeriod(toggleBilling(period))}><span /></button><span className={period === 'yearly' ? s.selectedPeriod : ''}>Yearly</span></div>
      <div className={s.plans} aria-live="polite" aria-atomic="true">{plans.map(plan => <article key={plan.name} className={`${s.plan} ${plan.name === 'Pro' ? s.proPlan : ''}`}>
        <div className={s.planDetails}><h2>{plan.name}</h2><p>{plan.description}</p></div>
        <div className={s.planPrice}><p>${getPrice(plan.monthlyPrice, period).toFixed(2)}</p><span>per {period === 'monthly' ? 'month' : 'year'}</span></div>
        <DemoLink className={`${s.button} ${plan.name === 'Pro' ? s.whiteButton : ''}`} label={`Pick ${plan.name} plan`}>Pick plan</DemoLink>
      </article>)}</div>
    </section><Comparison /><BetaBanner />
  </>;
}

function NotFound() {
  return <section className={s.notFound}><h1>Page not found</h1><p>Head back home to explore Photosnap.</p><Link className={s.button} to="/">Back to home</Link></section>;
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pathname.replace(/\.html$/, '').split('/')[1];
    document.title = page ? `Photosnap | ${page.charAt(0).toUpperCase() + page.slice(1)}` : 'Photosnap | Create and share your photo stories';
  }, [pathname]);
  return <Layout><Routes>
    <Route path="/" element={<Home />} /><Route path="/index.html" element={<Home />} />
    <Route path="/stories" element={<Stories />} /><Route path="/stories.html" element={<Stories />} />
    <Route path="/features" element={<Features />} /><Route path="/features.html" element={<Features />} />
    <Route path="/pricing" element={<Pricing />} /><Route path="/pricing.html" element={<Pricing />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout>;
}
