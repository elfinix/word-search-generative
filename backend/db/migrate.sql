-- Create scores table
CREATE TABLE IF NOT EXISTS public.scores (
    id BIGSERIAL PRIMARY KEY,
    player_name TEXT NOT NULL DEFAULT 'Trainer',
    difficulty TEXT NOT NULL,
    time_seconds INTEGER NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create game_stats table
CREATE TABLE IF NOT EXISTS public.game_stats (
    id BIGSERIAL PRIMARY KEY,
    puzzles_completed INTEGER DEFAULT 0,
    words_found INTEGER DEFAULT 0
);

-- Seed existing records from SQLite
INSERT INTO public.scores (player_name, difficulty, time_seconds, score, created_at)
VALUES
    ('hiho', 'medium', 56, 902, '2026-08-15 03:14:29+00'),
    ('pink', 'medium', 45, 935, '2026-08-15 07:49:02+00');

INSERT INTO public.game_stats (puzzles_completed, words_found)
VALUES (2, 21);
