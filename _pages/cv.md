---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

## Current position

PhD student in Statistics<br>
School of Statistics, {{ site.author.employer }}

## Research

Statistical transfer learning across heterogeneous datasets, with interests in selective information sharing, heterogeneous feature spaces, and high-dimensional statistical guarantees.

Broader interests include dependence structures, network data, and mathematical statistics.

## Publications

{% assign published_papers = site.publications | where: "category", "publications" | sort: "date" | reverse %}
{% assign preprints = site.publications | where: "category", "preprints" | sort: "date" | reverse %}
{% if published_papers.size > 0 %}
{% include paper-list.html papers=published_papers compact_status=true %}
{% endif %}
{% if preprints.size > 0 %}
{% include paper-list.html papers=preprints compact_status=true %}
{% endif %}

## Contact

{% if site.author.email %}[{{ site.author.email }}](mailto:{{ site.author.email }}){% endif %}{% if site.author.email and site.author.github %} · {% endif %}{% if site.author.github %}[GitHub](https://github.com/{{ site.author.github }}){% endif %}
