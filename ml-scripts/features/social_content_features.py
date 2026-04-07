"""
Feature engineering for social media content strategy (Pipeline 4).

Produces a modelling-ready DataFrame from the raw social_media_posts table.
Only before-post features are included as X variables.
After-post engagement columns are returned separately for EDA.
"""

import pandas as pd
import numpy as np

# ── Before-post categorical columns to one-hot encode ─────────────────────────
# We enforce explicit category order so the dropped baseline (reference) is stable
# and matches business-friendly comparisons (e.g., ImpactStory vs ThankYou).
CATEGORICAL_COLS = [
    "platform",
    "post_type",
    "media_type",
    "sentiment_tone",
    "content_topic",
    "call_to_action_type",
    "day_of_week",
]

# Baselines are the FIRST entry in each list (because we use drop_first=True).
CATEGORY_ORDERS: dict[str, list[str]] = {
    "platform": ["LinkedIn", "Facebook", "Instagram", "Twitter", "TikTok", "YouTube", "WhatsApp"],
    "post_type": ["ThankYou", "ImpactStory", "FundraisingAppeal", "Campaign", "EventPromotion", "EducationalContent"],
    "media_type": ["Text", "Photo", "Video", "Carousel", "Reel"],
    "sentiment_tone": ["Informative", "Emotional", "Urgent", "Celebratory", "Hopeful", "Grateful"],
    "content_topic": [
        "Gratitude",
        "Health",
        "SafehouseLife",
        "Reintegration",
        "AwarenessRaising",
        "CampaignLaunch",
        "Education",
        "DonorImpact",
        "EventRecap",
    ],
    # Baseline should be "None" per pipeline spec (fill null with 'None').
    "call_to_action_type": ["None", "DonateNow", "LearnMore", "ShareStory", "SignUp"],
    "day_of_week": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
}

# ── Before-post boolean columns (cast to int) ────────────────────────────────
BOOLEAN_COLS = [
    "features_resident_story",
    "has_call_to_action",
    "is_boosted",
]

# ── Before-post numeric columns ──────────────────────────────────────────────
NUMERIC_COLS = [
    "boost_budget_php",
    "caption_length",
    "num_hashtags",
    "post_hour",
]

# ── Target ───────────────────────────────────────────────────────────────────
TARGET = "donation_referrals"

# ── After-post columns (EDA only — never used as X) ─────────────────────────
AFTER_POST_COLS = [
    "shares",
    "likes",
    "comments",
    "saves",
    "impressions",
    "reach",
    "engagement_rate",
]


def build_features(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series, pd.DataFrame]:
    """
    Transform raw social_media_posts into (X, y, eda_engagement).

    Returns
    -------
    X : pd.DataFrame
        Before-post features, one-hot encoded and ready for modelling.
    y : pd.Series
        Target variable (donation_referrals as float).
    eda_engagement : pd.DataFrame
        After-post engagement metrics for EDA plots only.
    """
    df = df.copy()

    # ── Null handling ─────────────────────────────────────────────────────────
    df["call_to_action_type"] = df["call_to_action_type"].fillna("None")
    df["boost_budget_php"] = pd.to_numeric(df["boost_budget_php"], errors="coerce").fillna(0)
    df["caption_length"] = pd.to_numeric(df["caption_length"], errors="coerce").fillna(0)
    df["num_hashtags"] = pd.to_numeric(df["num_hashtags"], errors="coerce").fillna(0)
    df["post_hour"] = pd.to_numeric(df["post_hour"], errors="coerce").fillna(12)

    # ── Target ────────────────────────────────────────────────────────────────
    df[TARGET] = pd.to_numeric(df[TARGET], errors="coerce").fillna(0).astype(float)
    y = df[TARGET]

    # ── After-post (EDA only) ─────────────────────────────────────────────────
    eda_cols_present = [c for c in AFTER_POST_COLS if c in df.columns]
    eda_engagement = df[eda_cols_present].apply(pd.to_numeric, errors="coerce").fillna(0)

    # ── Boolean → int ─────────────────────────────────────────────────────────
    for col in BOOLEAN_COLS:
        if col in df.columns:
            df[col] = df[col].astype(bool).astype(int)

    # ── One-hot encode categoricals ───────────────────────────────────────────
    cat_cols_present = [c for c in CATEGORICAL_COLS if c in df.columns]
    for col in cat_cols_present:
        # Enforce stable baseline (first category) when possible.
        if col in CATEGORY_ORDERS:
            ordered = CATEGORY_ORDERS[col]
            # Keep only categories actually present + ensure baseline exists.
            present = [x for x in ordered if x in set(df[col].dropna().astype(str))]
            if ordered[0] not in present:
                present = [ordered[0]] + present
            df[col] = pd.Categorical(df[col].astype(str), categories=present, ordered=True)
        else:
            df[col] = df[col].astype(str)

    # drop_first=True prevents the dummy-variable trap when using an intercept in OLS.
    df_encoded = pd.get_dummies(df[cat_cols_present], drop_first=True).astype(int)

    # ── Assemble X ────────────────────────────────────────────────────────────
    bool_present = [c for c in BOOLEAN_COLS if c in df.columns]
    X = pd.concat(
        [df[bool_present + NUMERIC_COLS].reset_index(drop=True),
         df_encoded.reset_index(drop=True)],
        axis=1,
    )

    return X, y.reset_index(drop=True), eda_engagement.reset_index(drop=True)
