---
title: "Research"
permalink: /research/
author_profile: true
---

My central research program is statistical transfer learning across heterogeneous datasets. My work is organized around one question: **What information should we borrow, and what should we leave behind?**

## 1. What information should we borrow?

Related datasets can help when target data are limited, but source populations may differ from the target. The statistical question is which source information is useful for estimating the target model.

My published paper, [*Transfer learning for high dimensional data with discrete responses*](https://doi.org/10.1016/j.csda.2025.108292), studies this question in sparse, high-dimensional models with discrete responses. It uses observation-level selection and importance weighting to borrow information from heterogeneous source populations. Its theoretical guarantees account for both usable source information and error in estimating the weights; improvements over target-only estimation require stated conditions.

## 2. What if datasets measure different variables?

Differences between studies also arise in what they measure. My public preprint, [*Transfer Learning with Heterogeneous Feature Spaces in Linear Regression*](https://arxiv.org/abs/2609.08526), considers a fully observed target feature set and source studies that observe subsets of those variables.

Different target variables can receive different amounts of source information. The paper studies how this uneven feature coverage affects estimation accuracy, including in high-dimensional linear regression.

## 3. What if information is only partially shared?

**Ongoing work.** {{ site.data.research.current_research_overview }}

The guiding question is how borrowing should adapt when a source is useful for some parts of a target problem and less useful for others.

## 4. Where might this idea go next?

I am broadly interested in dependence structures, structured data, network data, and mathematical statistics. These interests suggest emerging directions for the transfer-learning program.

How far can selective borrowing extend beyond regression when relationships between observations or structural constraints become part of the statistical problem? This is an open question I am thinking about.
