CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    affiliation TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    selected_theme TEXT NOT NULL,
    paper_title TEXT NOT NULL,
    abstract_text TEXT NOT NULL,
    word_count INT NOT NULL,
    CONSTRAINT strict_word_count CHECK (word_count >= 250 AND word_count <= 300)
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert access for all anonymous users" 
ON public.submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Restrict read operations to database administrators" 
ON public.submissions FOR SELECT USING (auth.role() = 'service_role');
