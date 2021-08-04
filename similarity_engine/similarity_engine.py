import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SimilarityEngine:
    def __init__(self, min_df=1, stop_words='english', number_of_results=3, similarity_threshold=0.2):
        self.vectorizer = TfidfVectorizer(min_df=min_df, stop_words=stop_words)
        self.number_of_results = number_of_results
        self.similarity_threshold = similarity_threshold

    def run(self, input_doc, corpus):
        corpus.append(input_doc)
        tfidf = self.vectorizer.fit_transform(corpus)

        cos_sim = cosine_similarity(tfidf[-1], tfidf[:-1])[0]

        result = np.argsort(-cos_sim)[:self.number_of_results]
        return [x for x in result if cos_sim[x] > self.similarity_threshold]
