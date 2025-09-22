---
title: "Paper Preprint published"
date: 2025-06-16
author: PictSure Team
tags: [announcement, icl, vision]
category: Update
cover: assets/img/PictSureFirstPaper.png
excerpt: "A quick overview of the vision-only ICL classifier and what we’re releasing."
---

We’re excited to share our first preprint: **PictSure: Pretraining Embeddings Matters for In-Context Learning Image Classifiers**. Read it on [arXiv](https://arxiv.org/abs/2506.14842).

## Overview
The core idea is simple: in **vision-only in-context learning (ICL)**, the quality of the **embedding model**—its architecture and pretraining—is critical. We show that frozen, pretrained **ResNets** and **ViTs with triplet-loss objectives** enable PictSure to learn robustly **without backward passes**, relying purely on contextual examples at inference time.  

On benchmarks spanning **general, agricultural, and medical imagery**, PictSure variants match or outperform much larger CLIP-based ICL models. In particular, they excel in **out-of-domain tasks** (e.g. Brain Tumor, OrganCMNIST), where language-aligned embeddings fall short.

## PictSure at a glance
- Transformer with **asymmetric attention masks** for in-context classification  
- **Frozen ResNet18 / ViT backbones** with supervised and triplet-loss pretraining recipes  
- Compact design (53M–128M params) that achieves **state-of-the-art OOD generalization** without gradient updates  

## Why it matters
Few-shot image classification usually relies on **fine-tuning** or **language semantics**. Both are brittle: fine-tuning requires costly adaptation, and text alignment often fails in domains with weak or ambiguous labels.  
PictSure instead:
- Uses **no backward pass at inference** — instant deployment  
- Stays in the **visual space only** — no reliance on CLIP-style semantics  
- Achieves **higher stability and accuracy** under distribution shift  

## Next steps
- Broaden beyond 10-way classification  
- Larger-scale OOD benchmarks across specialized domains  
- Hugging Face demo + open library release: [github.com/PictSure/pictsure-library](https://github.com/PictSure/pictsure-library)

## Citation
```bibtex
@article{schiesser2025pictsure,
  title={PictSure: Pretraining Embeddings Matters for In-Context Learning Image Classifiers},
  author={Schiesser, Lukas and Wolff, Cornelius and Haas, Sophie and Pukrop, Simon},
  journal={arXiv preprint arXiv:2506.14842},
  year={2025}
}
```