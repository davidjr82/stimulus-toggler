import{_ as s,c as a,o as n,a as t}from"./app.69f788a7.js";const h=JSON.parse('{"title":"Getting started","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started.md"}'),l={name:"getting-started.md"},o=t(`<h1 id="getting-started" tabindex="-1">Getting started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><p>Follow these steps to have it working.</p><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-hidden="true">#</a></h2><p><a href="https://github.com/hotwired/stimulus" target="_blank" rel="noreferrer">Hotwired Stimulus</a> &gt;=v3 must be installed.</p><p>Follow instructions in <a href="https://stimulus.hotwired.dev/handbook/installing" target="_blank" rel="noreferrer">https://stimulus.hotwired.dev/handbook/installing</a></p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h2><p>Install the package:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm install @davidjr82/stimulus-toggler</span></span>
<span class="line"></span></code></pre></div><h2 id="use-it-in-your-app" tabindex="-1">Use it in your app <a class="header-anchor" href="#use-it-in-your-app" aria-hidden="true">#</a></h2><p>Import the controller into your application:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Application</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@hotwired/stimulus</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> TogglerController </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@davidjr82/toggler_controller</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Stimulus </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Application</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">Stimulus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">register</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">toggler</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> TogglerController)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>Then, initialize the controller in you html, for example, in the body tag:</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-controller</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">toggler</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>And now copy any of the examples inside your body tag. \u{1F389} \u{1F4AF}</p>`,14),e=[o];function p(r,c,i,D,d,y){return n(),a("div",null,e)}const u=s(l,[["render",p]]);export{h as __pageData,u as default};