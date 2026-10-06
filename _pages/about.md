---
permalink: /
title: "Zheng Zejing"
author_profile: true
home: true
redirect_from: 
  - /about/
  - /about.html
---

{% include base_path %}

<section class="notebook-hero" aria-labelledby="hero-title">
  <h1 id="hero-title">{{ page.title | escape }}</h1>
  <p class="hero-affiliation">PhD student in Statistics<br><a href="https://www.bnu.edu.cn">Beijing Normal University</a></p>
  <p class="hero-prose">My research focuses on statistical transfer learning: how to use information from related datasets when populations, measurements, or underlying structures differ.</p>
  <p class="hero-question">What information should we borrow,<br class="wide-break"> and what should we leave behind?</p>
  <p class="hero-prose">I study this question in high-dimensional models, with particular interests in selective information sharing, heterogeneous feature spaces, and statistical guarantees under heterogeneity. I am also broadly interested in dependence structures, network data, and mathematical statistics.</p>
  <p class="hero-links"><a href="{{ base_path }}/publications/">Papers</a>{% if site.author.github %} <span aria-hidden="true">·</span> <a href="https://github.com/{{ site.author.github | escape }}">GitHub</a>{% endif %} <span aria-hidden="true">·</span> <a href="{{ base_path }}/cv/">CV</a>{% if site.author.email %} <span aria-hidden="true">·</span> <a href="mailto:{{ site.author.email | escape }}">Email</a>{% endif %}</p>
</section>

{% assign research_themes = site.data.research.themes | where_exp: "theme", "theme.title != nil" | where_exp: "theme", "theme.title != empty" | where_exp: "theme", "theme.question != nil" | where_exp: "theme", "theme.question != empty" %}
{% if research_themes.size > 0 %}
<section class="notebook-section themes-section" aria-labelledby="research-questions">
  <h2 id="research-questions">Research themes</h2>
  <div class="theme-grid">{% include research-questions.html %}</div>
</section>
{% endif %}

{% assign current_projects = site.data.research.current_research | where_exp: "project", "project.title != nil" | where_exp: "project", "project.title != empty" | where_exp: "project", "project.description != nil" | where_exp: "project", "project.description != empty" %}
{% assign current_research_overview = site.data.research.current_research_overview | default: "" | strip %}
{% comment %}Restore this homepage section automatically when at least two confirmed projects are available.{% endcomment %}
{% if current_projects.size > 1 %}
<section class="notebook-section prose-section" aria-labelledby="current-research">
  <h2 id="current-research">Current research</h2>
  {% if current_research_overview != empty %}<p>{{ current_research_overview | escape }}</p>{% endif %}
  {% for project in current_projects %}
  <article>
    <h3>{{ project.title | escape }}</h3>
    <p>{{ project.description | escape }}</p>
    {% if project.url %}<p><a href="{{ project.url | relative_url }}">More about this project</a></p>{% endif %}
  </article>
  {% endfor %}
</section>
{% endif %}

{% assign blackboard_questions = site.data.research.blackboard | where_exp: "item", "item.question != nil" | where_exp: "item", "item.question != empty" %}
{% if blackboard_questions.size > 0 %}
<section class="notebook-section blackboard-section" aria-labelledby="blackboard">
  <h2 id="blackboard">On my blackboard</h2>
  <p class="section-note">Questions currently on my blackboard — open questions, not claimed results.</p>
  <ol class="blackboard-list" role="list">
    {% for item in blackboard_questions %}
    <li><span class="question-number" aria-hidden="true">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span><p>{{ item.question | escape }}</p></li>
    {% endfor %}
  </ol>
</section>
{% endif %}

{% assign selected_papers = site.publications | where: "selected", true | sort: "selected_order" %}
{% if selected_papers.size > 0 %}
<section class="notebook-section" aria-labelledby="selected-papers">
  <h2 id="selected-papers">Selected papers</h2>
  {% include paper-list.html papers=selected_papers compact_status=true %}
  <p class="section-link"><a href="{{ base_path }}/publications/">All papers</a></p>
</section>
{% endif %}

{% if site.posts.size > 0 %}
<section class="notebook-section" aria-labelledby="research-notes">
  <h2 id="research-notes">Notes</h2>
  <ul class="notes-list" role="list">
    {% for post in site.posts limit:3 %}
    <li>
      <article>
        <h3><a href="{{ post.url | prepend: base_path }}">{{ post.title | escape }}</a></h3>
        <p><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></p>
        {% if post.description %}<p>{{ post.description | escape }}</p>{% elsif post.excerpt %}{{ post.excerpt | markdownify }}{% endif %}
      </article>
    </li>
    {% endfor %}
  </ul>
  <p class="section-link"><a href="{{ base_path }}/notes/">All notes</a></p>
</section>
{% endif %}
