import re
import pandas as pd


from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

# Ini untuk hapus stopword
stop_factory = StopWordRemoverFactory()
stop_remover = stop_factory.create_stop_word_remover()

# Ini untuk simplified word to its root (stemming)
factory = StemmerFactory()
stemmer = factory.create_stemmer()

def remove_blanks(df, column_name):
   return df[df[column_name] != ""]


def remove_duplicates(df, column_name):
  return df.drop_duplicates(subset=[column_name])

def clean_text(text):
    text = text.lower()  # ubah ke huruf kecil
    text = re.sub(r'http\S+|www\.\S+', ' ', text)  # URL
    text = re.sub(r'@\w+', ' ', text)  # mention
    text = re.sub(r'#\w+', ' ', text)  # hashtag
    text = re.sub(r'[^a-zA-Z0-9\s:]', ' ', text)  # simbol dan tanda baca
    text = text.replace('\n', ' ') # mengganti baris baru dengan spasi
    text = re.sub(r'\s+', ' ', text)  # spasi ganda
    text = text.strip(' ') # menghapus karakter spasi dari kiri dan kanan teks
    return text


# def tokenizingText(text):
#     text = word_tokenize(text)
#     return text

# def toSentence(list_words):
#     sentence = ' '.join(word for word in list_words)
#     return sentence

def normalize_text(text):
    
    stopwords_text = stop_remover.remove(text)
    stemmed_text = stemmer.stem(stopwords_text)
    
    return stemmed_text

# remove duplicate, clean, slang, normalize (text_akhir)


