import pickle

import tensorflow as tf
import numpy as np
from pythainlp import word_tokenize
from keras.preprocessing.sequence import pad_sequences


class TextGenerator:
    def __init__(self):
        self.model = tf.keras.models.load_model('./model/model.h5')
        self.tokenizer = pickle.load(open('./model/tokenizer.pickle', 'rb'))

    def generate_text(self, text: str, max_sequence_len: int = 22) -> str:
        seed_text = ' '.join(word_tokenize(text))
        counter = 0
        while counter < 100:
            token_list = self.tokenizer.texts_to_sequences([seed_text])[0]
            token_list = pad_sequences([token_list], maxlen=max_sequence_len - 1, padding='pre')
            predicted = self.model.predict(token_list, verbose=0)
            predicted = np.random.choice(np.arange(0, predicted.shape[1]), p=predicted[0])

            output_word = ''
            for word, index in self.tokenizer.word_index.items():
                if index == predicted:
                    output_word = word
                    break
            seed_text += ' ' + output_word
            if output_word == 'END':
                joined_text = ''.join(seed_text.split(' ')[:-1])
                return joined_text
            counter += 1
        return seed_text
