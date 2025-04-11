from Database.ChromaDBConnection import ChromaDBConnection
from logger import logger
from config import CONNECTION_NAME
from langchain_ollama import OllamaEmbeddings

# BM25
import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize
from rank_bm25 import BM25Okapi

LLM_MODEL = 'llama3.2'
EMBEDDING_MODEL = 'nomic-embed-text'

class VectorStore:
    def __init__(self, path):
        self.client = ChromaDBConnection(path)
        self.collection = self.client.get_collection(CONNECTION_NAME)

    def add_to_vectorstore(self, ids, vector, metadata, documents):
        self.collection.upsert(ids = ids , embeddings = vector, metadatas = metadata, documents = documents)
        logger.info(f"Added vector to collection: {metadata}")

    def search_vectorstore(self, vector, k):
        results = self.collection.query(vector, n_results=k)
        logger.info(f"Found {len(results)} results")
        return results

    def delete_from_vectorstore(self, metadata):
        self.collection.delete(metadata)
        logger.info(f"Deleted vector from collection: {metadata}")

    def get_embeddings(self):
        # logger.info("Loading embedding model...")
        embeddings = OllamaEmbeddings(model=EMBEDDING_MODEL)
        return embeddings
    
    def queryStore(self, query, k):
        vector = self.get_embeddings().embed_query(query)
        result = self.search_vectorstore(vector, 2 * k)
        docs = result['documents'][0]

        #Perform BM25 
        tokenized_docs = [word_tokenize(doc.lower()) for doc in docs]

        bm25 = BM25Okapi(tokenized_docs)

        tokenized_query = word_tokenize(query.lower())
        scores = bm25.get_scores(tokenized_query)

        ranked_docs = [doc for _, doc in sorted(zip(scores, docs), reverse=True)]

        return ranked_docs[:k]
    
    def get_all_documents(self):
        try:
            results = self.collection.get()
            documents = results.get('documents', [])
            metadata = results.get('metadatas', [])
            logger.info(f"Retrieved {len(documents)} documents from the vector store.")
            return list(zip(documents, metadata))
        except Exception as e:
            logger.error(f"Failed to retrieve documents: {e}")
            return []
    
    def get_content_of_person(self, person):
        return [item['content'] for item in self.collection.get(where={"name": person})['metadatas']]