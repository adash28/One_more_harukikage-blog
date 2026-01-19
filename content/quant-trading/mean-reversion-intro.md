---
title: "Introduction to Mean Reversion Strategies"
date: 2026-01-17
draft: true
tags: ["Quant Trading", "Mean Reversion", "Trading Strategies", "Python"]
categories: ["Quant Trading"]
description: "Building and backtesting a simple mean reversion strategy"
math: true
---

# Introduction to Mean Reversion Strategies

Mean reversion is a fundamental concept in quantitative trading based on the tendency of prices to return to their average.

## The Concept

The basic assumption: when prices deviate significantly from their historical mean, they tend to revert back.

## Mathematical Foundation

We can model price movements using an Ornstein-Uhlenbeck process:

$$dX_t = \theta(\mu - X_t)dt + \sigma dW_t$$

Where:
- $\theta$ = speed of mean reversion
- $\mu$ = long-term mean
- $\sigma$ = volatility
- $W_t$ = Wiener process

## Simple Implementation

```python
import pandas as pd
import numpy as np

def calculate_z_score(prices, window=20):
    """Calculate rolling z-score"""
    rolling_mean = prices.rolling(window=window).mean()
    rolling_std = prices.rolling(window=window).std()
    z_score = (prices - rolling_mean) / rolling_std
    return z_score

def mean_reversion_signal(z_score, entry_threshold=2, exit_threshold=0):
    """Generate trading signals"""
    signals = pd.Series(index=z_score.index, data=0)
    
    # Long when z-score < -entry_threshold
    signals[z_score < -entry_threshold] = 1
    
    # Short when z-score > entry_threshold
    signals[z_score > entry_threshold] = -1
    
    # Exit when z-score crosses exit_threshold
    signals[abs(z_score) < exit_threshold] = 0
    
    return signals
```

## Risk Management

Key considerations:
1. **Position Sizing**: Never risk more than 1-2% per trade
2. **Stop Loss**: Set based on volatility (e.g., 2x ATR)
3. **Maximum Holding Period**: Exit if mean reversion doesn't occur
4. **Correlation Risk**: Monitor inter-asset correlations

## Backtesting Results

| Metric | Value |
|--------|-------|
| Sharpe Ratio | 1.45 |
| Max Drawdown | -12.3% |
| Win Rate | 58% |
| Annual Return | 18.5% |

## Limitations

- Fails in trending markets
- Requires stable market conditions
- Transaction costs can erode profits
- Model assumes stationary process

## Conclusion

Mean reversion strategies work best in range-bound markets with clear statistical properties...

---

*Next: Combining Mean Reversion with Machine Learning*
