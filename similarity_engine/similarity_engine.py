import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer


class SimilarityEngine:
    def __init__(self, min_df=1, stop_words='english'):
        self.vectorizer = TfidfVectorizer(min_df=min_df, stop_words=stop_words)

    def run(self, corpus):
        corpus = [
            "This is a test sentence",
            "Oranges are my favorite fruit",
            "I'd like an apple",
            "An apple a day keeps the doctor away",
            "Obama speaks to the media in Illinois",
            "The president greets the press in Chicago",
            "50 new COVID-19 cases were reported in Singapore today",
            '3 theft cases were reported in Jurong West last week'
        ] if not corpus else corpus

        input_doc = 'COVID is a hoax. Blame the chinese'
        corpus.append(input_doc)

        tfidf = self.vectorizer.fit_transform(corpus)
        pairwise_similarity = tfidf * tfidf.T

        array = pairwise_similarity.toarray()
        np.fill_diagonal(array, np.nan)

        input_index = corpus.index(input_doc)

        print(array)

        result_index = np.nanargmax(array[input_index])

        corpus.pop()

        return result_index
