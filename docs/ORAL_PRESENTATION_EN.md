# Homework 3 — Oral presentation (English)

## Introduction
This project models an aggregate penetration score for *n* systems and *m* independent attackers. It is a mathematical simulation, not a real intrusion or vulnerability scanner. Each attacker generates *n* independent and identically distributed random increments.

## Models
The Bernoulli increment is 1 with probability *p* and 0 otherwise. Its expected value is *p* and its variance is *p(1−p)*. The Rademacher increment is +1 or −1 with equal probability. Its expected value is zero and its variance is one.

## Three statistics
For each attacker I compute the sum S_n, the average S_n/n, and the square-root-normalized sum S_n/√n. If an increment has mean μ and variance σ², the three variances are nσ², σ²/n, and σ² respectively. Their expectations are nμ, μ, and √n μ.

## Law of Large Numbers
The average S_n/n converges in probability to μ. The dashboard shows empirical averages and the fraction of attacker averages more than ε away from μ for increasing system counts. For a fixed ε, this fraction should decrease as n grows, subject to Monte Carlo fluctuations.

## Central Limit Theorem
For Rademacher increments, S_n/√n converges in distribution to a standard normal N(0,1). For Bernoulli increments with 0<p<1, I instead plot the centered and standardized sum (S_n−np)/√(np(1−p)). The original Bernoulli S_n/√n is not centered and does not converge to N(0,1) when p>0.

## Meaning of n and m
Increasing n changes each attacker's sum and the variance of the sample average. Increasing m does not change the theoretical distribution of one attacker's score; it generally improves the precision of Monte Carlo estimates. The attackers do not interact in this simplified model.

## Software design
I used HTML and CSS for the interface, JavaScript ES modules for simulation and statistical analysis, Chart.js for visualization, and Vite for development and production builds. The simulator accepts a reproducible pseudorandom seed. Automated tests verify mathematical identities and simulation behavior. GitHub Actions tests, builds, and publishes the static site.

## Limitations
The independence assumption and identical success probabilities are simplifications. The normal approximation is asymptotic, so small-n histograms remain discrete. The pseudorandom generator is for reproducible simulations and is not suitable for cryptography.

## Possible questions
**Why divide by √n?** Because Var(S_n)=nσ², and dividing by √n makes the variance constant.

**Why does the Bernoulli normalized score need centering?** Because E[S_n/√n]=p√n, which grows with n when p>0.

**Does the LLN say every path becomes smooth?** No. It says the probability of a fixed deviation of the sample average tends to zero.

**What does m represent?** The number of independent replicated attacker trajectories used to estimate a distribution.
