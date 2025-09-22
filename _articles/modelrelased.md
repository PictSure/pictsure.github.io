---
title: "Models now on Hugging Face"
date: 2025-08-05
author: PictSure Team
tags: [release, icl, vision]
category: Update
cover: assets/img/PictSureFirstModel.png
excerpt: "Our pretrained PictSure models are now live on Hugging Face."
---

Great news! We’ve released **two pretrained PictSure models** on Hugging Face 🤗 — making it easier than ever to try out **vision-only in-context learning (ICL)**.

## What’s included
- **PictSure-ResNet18**  
  A compact 53M parameter model using frozen ResNet18 embeddings.  
- **PictSure-ViT-Triplet**  
  A 128M parameter Vision Transformer variant pretrained with a **triplet loss**, yielding a more structured embedding space and stronger out-of-domain generalization.

Both models are **plug-and-play**: no fine-tuning, no backward passes. You can condition on a few labeled examples and directly classify new queries.

## Why it matters
With these Hugging Face releases, anyone can:
- Explore **few-shot classification** in vision without writing custom training loops.  
- Benchmark PictSure on **in-domain** datasets like miniImageNet and **out-of-domain** datasets like Brain Tumor or OrganCMNIST.
- Build on top of our models for **research or applications** in specialized domains.

## Get started
Check them out here:  
- [PictSure-ResNet18 on Hugging Face](https://huggingface.co/pictsure/pictsure-resnet)  
- [PictSure-ViT-Triplet on Hugging Face](https://huggingface.co/pictsure/pictsure-vit)

To get things started, here is a minimal example using the ResNet18 model:

```python
from PictSure import PictSure
from PIL import Image

# Load pre-trained model
model = PictSure.from_pretrained("pictsure/pictsure-vit")

# Prepare context images and labels
context_images = [
    Image.open("cat1.jpg"),
    Image.open("cat2.jpg"),
    Image.open("dog1.jpg"),
    Image.open("dog2.jpg")
]
context_labels = [0, 0, 1, 1]  # 0 for cat, 1 for dog

# Set context
model.set_context_images(context_images, context_labels)

# Make prediction on new image
test_image = Image.open("unknown_animal.jpg")
prediction = model.predict(test_image)
print(f"Predicted class: {prediction}")
```

### Next steps
- Add example notebooks and tutorials for **quick few-shot experiments**  
- Provide a **Hugging Face demo space** with interactive tasks  
- Extend the library with more pretrained backbones
