## Bangladesh MFS Market Opportunity

Bangladesh Bank data shows the scale of the market FinTrack is designed for.

As of **February 2025**, Bangladesh had approximately **240.47 million MFS users**, including customer and merchant accounts. Bangladesh Bank also reported **239.24 million registered customer accounts** at the same time.

Bangladesh Bank's 2024 Financial Stability Report recorded approximately **238.60 million registered MFS clients** and **88.80 million active clients** as of December 2024.

This means FinTrack is targeting a very large existing MFS ecosystem rather than requiring users to adopt a new financial platform.

### Why this matters

FinTrack can be implemented as an **AI financial intelligence layer inside an existing MFS platform such as upay**.

Instead of replacing the existing wallet, FinTrack uses transaction data that the MFS already generates to provide:

- Spending insights
- Personalized recommendations
- Proactive overspending alerts
- Natural-language savings goals
- Personalized budget plans
- A transaction-aware financial chatbot

### Market Scale

| Metric | Bangladesh |
|---|---:|
| Registered MFS clients | **~239 million** |
| Active MFS clients | **~89 million** |

**Source:** Bangladesh Bank MFS statistics and Financial Stability Report 2024.


## What we did

| **Feature** | **Change** | **Why it saves money** |
|---|---|---|
| Categorization | Added a **knowledge base** (merchant lookup). The AI is called only for unknown merchants (85% of transactions are answered by the lookup). | 85% fewer AI calls |
| Recommendations | Updated **once per day** instead of on every transaction. | 30 calls per user per month instead of 100 |
| Chatbot | Added a **rate limit of 15 questions per user per day**. **Greetings** get a saved answer and **unrecognised text** gets a saved fallback response; neither calls the API. | Caps cost (each question resends the whole chat, so cost grows faster than question count); saved responses cost $0 |

## Before and after

| **Feature** | **Before** | **After** | **Saving** |
|---|---:|---:|---:|
| Categorization | $13,800 | $2,070 | 85% |
| Recommendations | $216,000 | $64,800 | 70% |
| Chatbot | $5,256,000 | $726,300 | 86% |
| **Total per month** | **$5,485,800** | **$793,170** | **86%** |
| **Per user per month** | **$2.74** | **$0.40** | |

## Total Monthly AI Cost

The optimized system includes two additional AI-powered features: **Budget Planner** and **Anomaly Detection**.

For the new features, the calculation uses the same example API payload assumption of **100 input tokens + 10 output tokens per API call**.

| **Feature** | **API Usage** | **Monthly Cost** |
|---|---:|---:|
| Categorization | Optimized knowledge base + AI fallback | $2,070 |
| Recommendations | 30 calls/user/month | $64,800 |
| Chatbot | Maximum 15 API-bound questions/user/day | $726,300 |
| Budget Planner | 1 API call/user/month × 2M users | $84 |
| Anomaly Detection | 1 API call/transaction × 50M transactions | $2,100 |
| **Total** | | **$795,354/month** |

### Updated Cost

| **Feature** | **Current Monthly Cost** |
|---|---:|
| Categorization | $2,070 |
| Recommendations | $64,800 |
| Chatbot | $726,300 |
| Budget Planner | $84 |
| Anomaly Detection | $2,100 |
| **Total** | **$795,354/month** |

**The cost calculation is based on 20 million users.**

> **Note:** Budget Planner and Anomaly Detection costs are estimates based on the 100-input / 10-output token assumption. Actual cost will vary with the amount of data included in each prompt and the model's response length.

> **FinTrack does not need to create a new wallet. It can be integrated into the existing MFS ecosystem and add an AI-powered intelligence layer on top of transactions users already make.**

This makes the solution scalable from a single MFS provider such as upay to the broader Bangladesh MFS ecosystem.


## Sources

### Bangladesh MFS Market
- [Bangladesh Bank — MFS Statistics](https://www.bb.org.bd/en/index.php/financialactivity/mfsdata)
- [Bangladesh Bank — Annual Report 2024–2025](https://www.bb.org.bd/pub/annual/anreport/ar2024-2025.pdf)
- [Bangladesh Bank — Financial Stability Report 2024](https://www.bb.org.bd/mediaroom/pub/annual/fsr/financial%20stability%20report%202024.pdf)

### AI Pricing
- [DeepSeek — Official API Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [DeepSeek — Updates](https://api-docs.deepseek.com/updates/)
