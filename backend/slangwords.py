import csv
import requests
from io import StringIO

slangwords = {"ama": "sama", "klo": "kalau", "ttp": "tetap", "jd": "jadi", "jdi": "jadi", "@": "di", "abis": "habis", "masi": "masih", "bgt": "banget",
              "maks": "maksimal", "gk": "tidak" , "ga": "tidak", "gak": "tidak", "tdk": "tidak", "gabisa": "tidak bisa", "ngalamin": "mengalami", "yg": "yang",
              "blum": "belum", "blom": "belum", "tf": "transfer", "bngt": "banget", "slalu": "selalu", "jd": "jadi", "utk": "untuk", "apk": "aplikasi",
              "kasi": "kasih", "knpa": "kenapa", "bln": "bulan", "lu": "anda", "gua": "saya", "gue": "saya", "gw": "saya"}

slangwords_extra = {}

csv_file_path = 'https://raw.githubusercontent.com/nasalsabila/kamus-alay/refs/heads/master/colloquial-indonesian-lexicon.csv'


response = requests.get(csv_file_path)

# Check if the request was successful
if response.status_code == 200:
    # Create a StringIO object to treat the response content as a file
    csvfile = StringIO(response.text)

    # Use csv.DictReader to read the CSV data
    reader = csv.DictReader(csvfile)

    # Update slangwords_extra with the data from the CSV
    for row in reader:
        slangwords_extra[row['slang']] = row['formal']

    # Update slangwords with slangwords_extra
    slangwords.update(slangwords_extra)

else:
    print(f"Failed to fetch CSV data from {csv_file_path}")

def fix_slangwords(text):
    
    words = text.split()
    fixed_words = []

    for word in words:
        if word.lower() in slangwords:
            fixed_words.append(slangwords[word.lower()])
        else:
            fixed_words.append(word)

    fixed_text = ' '.join(fixed_words)
    return fixed_text