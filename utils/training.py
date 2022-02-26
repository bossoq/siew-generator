from typing import Any, List, Tuple
import warnings

import pickle
import tensorflow as tf
import pandas as pd
import numpy as np

from keras.callbacks import EarlyStopping
from keras.layers import Embedding, LSTM, Dense, Dropout
from keras.models import Sequential
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from numpy.random import seed
from pythainlp import word_tokenize


def read_input(input_file: str) -> pd.DataFrame:
    return pd.read_csv(input_file, encoding='utf-8', names=['text'])


def tokenize_sentence(df: pd.DataFrame) -> pd.DataFrame:
    df['tokens'] = df['text'].apply(lambda text: word_tokenize(text, keep_whitespace=True))
    df['processed_tokens'] = df['tokens'].apply(lambda tokens: tokens + ['END'])
    df['processed_sentence'] = df['processed_tokens'].apply(lambda tokens: ' '.join(tokens))
    return df


def get_sequence_of_tokens(corpus: pd.Series, tokenizer: Tokenizer) -> Tuple[List[str], int]:
    tokenizer.fit_on_texts(corpus)
    total_words = len(tokenizer.word_index) + 1

    input_sequences = list()
    for line in corpus:
        token_list = tokenizer.texts_to_sequences([line])[0]
        for i in range(1, len(token_list)):
            n_gram_sequence = token_list[:i + 1]
            input_sequences.append(n_gram_sequence)
    return input_sequences, total_words


def generate_padded_sequences(input_sequences: List[str], total_words: int) -> Tuple[np.ndarray, Any, int]:
    max_sequence_len = max([len(x) for x in input_sequences])
    input_sequences: np.ndarray = np.array(pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre'))

    predictors = input_sequences[:, :-1]
    label = input_sequences[:, -1]
    label = tf.keras.utils.to_categorical(label, num_classes=total_words)
    return predictors, label, max_sequence_len


def create_model(max_sequence_len: int, total_words: int) -> Sequential:
    input_len = max_sequence_len - 1
    model = Sequential()

    model.add(Embedding(total_words, output_dim=128, input_length=input_len))

    model.add(LSTM(units=256, return_sequences=True))
    model.add(Dropout(0.3))
    model.add(LSTM(units=256, return_sequences=True))
    model.add(Dropout(0.3))
    model.add(LSTM(units=128))
    model.add(Dropout(0.5))
    model.add(Dense(total_words, activation='softmax'))
    model.compile(loss='categorical_crossentropy', optimizer='adam')

    return model


def save_model(model: Sequential, model_file: str, tokenizer: Tokenizer, token_file: str):
    model.save(model_file)
    print('Model saved to', model_file)
    with open(token_file, 'wb') as f:
        pickle.dump(tokenizer, f, protocol=pickle.HIGHEST_PROTOCOL)
    print('Tokenizer saved to', token_file)


if __name__ == '__main__':
    tf.random.set_seed(1234)
    seed(1)
    warnings.filterwarnings('ignore')
    tokenizer = Tokenizer(lower=False)

    df = read_input('../datasets/siew_caption.txt')
    df = tokenize_sentence(df)
    inp_sequences, total_words = get_sequence_of_tokens(df['processed_sentence'], tokenizer)
    predictors, label, max_sequence_len = generate_padded_sequences(inp_sequences, total_words)
    print(f'Max Sequence Length: {max_sequence_len}, Total Words: {total_words}')
    model = create_model(max_sequence_len, total_words)
    print(model.summary())
    early_stopping = EarlyStopping(monitor='loss', patience=10)
    model.fit(predictors, label, epochs=500, verbose=1, callbacks=[early_stopping])
    save_model(model, '../model/model1.h5', tokenizer, '../model/tokenizer1.pickle')
