import time
from html_server import get_response

while True:
    start = time.time()
    resp = get_response()
    end = time.time()
    print("Return value: {}".format(resp))
    print("Total time: %s" % (end - start))
    time.sleep(5)
