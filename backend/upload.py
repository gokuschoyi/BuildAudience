from firebase_admin import firestore
from initial_data import data
import json

def saveData():
    db = firestore.client()
    print("starting to save data")
    # print(data["quote_of_the_day"])
    # dummydict={"qotd_author":data["quote_of_the_day"]["qotd_author"]}
    
    # batch = db.batch()
    # col_ref = db.collection(u'common')
    # doc_ref = col_ref.document(u'quote_of_the_day')
    # doc_ref.set(dummydict, merge=True)
    
    
    # print("Data saved")
    
    for key,val in data.items():
        ref = db.collection(u'common').document(key)
        ref.set(val)
    

""" save the data to the firestore database """
