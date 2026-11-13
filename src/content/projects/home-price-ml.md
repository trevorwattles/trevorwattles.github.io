---
# Facts from Trevor and the team paper (public/papers/home-price-prediction.pdf).
title: Home Price Prediction
order: 5
oneLiner: Predicting Las Vegas home sale prices from 11,000 real MLS sales with an ensemble of machine learning models.
role: Team member, 5-person ML project
dates: Oct – Dec 2024 # TODO: the paper's header says "CS 270, Winter 2024" — confirm which is right
context: BYU CS 270
stack:
  - Python
  - pandas
  - scikit-learn
  - geopy
  - Google Geocoding API
  - matplotlib/seaborn
  - Google Colab
visibility: private # no public repo or demo; the paper is the link
links:
  paper: /papers/home-price-prediction.pdf
media:
  - type: image
    src: cluster-map.webp
    alt: Map of Las Vegas home sales colored by k-means cluster
    caption: Home sales colored by k-means cluster (k = 5)
draft: false
---

#### What we built

- Cleaned and encoded 11,000 Las Vegas home sales from the Multiple Listing Service (MLS), turning categorical fields, dates, and yes/no amenities into model-ready features.
- Geocoded every address to latitude/longitude with a two-pass pipeline: free Nominatim lookups first, results outside Las Vegas filtered out, and the ~4,000 failures retried through the Google Geocoding API.
- Modeled real estate "comps" with a location-only k-nearest-neighbors model (k=2 was best across 10 random splits), and used k-means clustering (k=5, chosen with silhouette scores) to group similar homes.
- Combined a neural network (MLP), kNN, and k-means into an ensemble that cut error (RMSE) from $289,991 to $86,099, against a $325,883 baseline of guessing the average price.

#### The hard part

Our first neural network was barely better than guessing the average price. Sale prices ranged from $40K to over $15M, so a handful of luxury homes dominated the loss. We tried several transforms on the target before settling on trimming the 1st and 99th percentiles, log-scaling, and min-max normalizing, which gave the model a smooth distribution it could actually learn. The bigger gain came from location: once every home had coordinates, a nearest-neighbor model doing what an appraiser does, looking at what nearby homes sold for, outperformed using all the other features together. Ensembling it with the MLP and k-means clusters brought error down 70%.
