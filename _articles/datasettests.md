---
title: "More Examples and Dataset Implementations released"
date: 2026-09-04
author: PictSure Team
tags: [examples, benchmarks, datasets, icl, vision]
category: Update
cover: /assets/img/NewExamplesPictSure.png
excerpt: "A new repository with 16 ready-to-run dataset implementations and few-shot examples for every PictSure model."
---

We've published [github.com/PictSure/dataset-tests](https://github.com/PictSure/dataset-tests), an open test harness with **16 ready-to-run dataset implementations** and worked few-shot examples for **all five PictSure models**. If you've ever wondered how PictSure behaves on *your* kind of images, there is now a concrete example to copy from.

## What's in the repository
Every dataset lives in its own self-contained directory under `model_testing/datasets/`, with a `download.py` that fetches just the images that dataset needs and a `test_*.py` that declares its few-shot tasks:

```bash
python3 model_testing/datasets/dtd/download.py
python3 model_testing/datasets/dtd/test_dtd.py
```

Or run everything at once:

```bash
./model_testing/download_datasets.sh   # ~1200 images, gitignored
python3 model_testing/test_models.py
```

The two top-level entry points discover datasets automatically, so adding your own means adding a directory, not editing the runner. Useful flags:

```bash
python3 model_testing/test_models.py --list                  # what would run
python3 model_testing/test_models.py --datasets beans dtd    # a subset
python3 model_testing/test_models.py --models pictsure/pictsure-clip
```

## The 16 datasets
The set was chosen to stress different axes rather than to pile up more of the same:

- **Medical**: BrainTumor (4 MRI tumor types), ChestXray (binary grayscale radiographs)
- **Plant disease**: PlantDoc (8 tomato leaf diseases), Beans (3 leaf conditions)
- **Objects and fine-grained**: Caltech101, OxfordPets (breed level), Food101, StanfordCars
- **Remote sensing**: EuroSAT (64x64 land cover), RESISC45
- **Texture and symbols**: DTD (no object to latch onto), GTSRB (three speed-limit signs that differ only in their digits)
- **Degraded inputs**: CIFAR10 at 32x32, FashionMNIST at 28x28 grayscale
- **Controls**: CatsDogs (the exact 2-shot example from the model cards) and SwedishFlowers

Datasets are pulled at the smallest useful size through the Hugging Face dataset viewer API, a few hundred KB each, so getting started doesn't mean downloading full benchmark archives.

## What the runs show
All five encoders ran all 45 tasks end to end: **225 task runs, zero failures**, confirming the documented `from_pretrained` to `set_context_images` to `predict` pattern works for every published repository. Aggregated over all 45 tasks:

| Model | Micro accuracy | Macro accuracy | Best or tied on |
|---|---|---|---|
| `pictsure-vit` | 53.0% | 57.6% | 5/45 tasks |
| `pictsure-resnet` | 28.1% | 33.3% | 1/45 tasks |
| `pictsure-dinov2` | 74.9% | 77.0% | 16/45 tasks |
| `pictsure-dinov2-large` | 75.8% | 76.9% | 22/45 tasks |
| `pictsure-clip` | **77.6%** | **80.2%** | **23/45 tasks** |

A few things stand out:

- **The encoder matters far more than the shot count.** This is [the paper's](https://arxiv.org/abs/2506.14842) own claim, and it shows up bluntly: the ResNet variant averages 28% against CLIP's 78%, and adding shots does not close the gap. On DTD it actually gets *worse* with more context (12% down to 4%).
- **CLIP and DINOv2-large split the wins along domain lines.** CLIP leads where the distinction is semantic or textual, such as traffic signs (96% at 5-shot), remote sensing, car models and brain MRI. DINOv2 leads on object-centric natural images and on degraded inputs, where text-aligned features have less to grip.
- **Out-of-domain inputs cost less than expected.** FashionMNIST at 28x28 grayscale still reaches 77% over ten classes, and CIFAR-10 at 32x32 reaches 90%. Resolution mismatch degrades these encoders gracefully rather than breaking them.
- **Fine-grained difficulty is not a single axis.** OxfordPets is solved at breed level (100% for both DINOv2 variants at 3-shot), while PlantDoc stays between 21% and 39% for everything. The distinguishing feature has to be represented in the embedding; more shots cannot invent it.

The full per-task table, along with reproducibility notes and the caveats worth knowing (StanfordCars in particular looks like pretraining overlap rather than few-shot skill), is in the repository README.

## Why it matters
Until now, the fastest way to find out whether PictSure suits a given domain was to write the loading and evaluation code yourself. With these implementations you can point the harness at a domain close to yours, see how each encoder behaves at 1, 3, 5 and 10 shots, and then reuse that dataset directory as a template for your own data.

## Get started
- [PictSure/dataset-tests](https://github.com/PictSure/dataset-tests): the harness, the datasets and the full results
- [pictsure-library](https://github.com/PictSure/pictsure-library): the inference library itself
- [The pictsure-10 collection on Hugging Face](https://huggingface.co/collections/pictsure/pictsure-10): all five pretrained models
