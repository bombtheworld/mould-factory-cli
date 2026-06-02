# Mould Factory CLI

A command-line order management tool built for a small 
precision tooling workshop.

## What it does

- Add, view, find, and delete orders
- Track order status (pending / completed)
- Calculate profit and margin per order
- Warn when profit margin is below 20%
- Track due dates and flag overdue orders
- Persist data to a local JSON file

## Why I built this

My cousin runs a small precision tooling workshop in China.
Orders were tracked in Excel and WeChat — data got lost,
deadlines were missed. I built this CLI tool as the first
prototype before building a full web application.

## Tech

- Node.js (no frameworks)
- File system persistence (JSON)

## How to run

node app.js

## What's next

This CLI is the foundation for a full-stack web app:
- V1: Node.js + Express + PostgreSQL + Docker
- V2: React + TypeScript + PostGIS + AI pricing assistant
- V3: Public portfolio version deployed on AWS