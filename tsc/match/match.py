#!/usr/bin/python
#encoding=utf8

import os
import sys
import urllib
import urllib2
import json
import hashlib
import hmac
import time
import datetime
import base64
from urllib import urlencode
import urllib2
from urllib import quote
from urlparse import urlparse

def gen_auth(access_key, secret_key, utc_time_str, url, method):
    url_parse_ret = urlparse(url)
    host = url_parse_ret.hostname
    path = url_parse_ret.path
    version = "1"
    expiration_seconds = "1800"
    signature_headers = "host"

    # 1 Generate SigningKey
    val = "bce-auth-v%s/%s/%s/%s" % (version, access_key, utc_time_str, expiration_seconds)
    signing_key = hmac.new(secret_key, val, hashlib.sha256).hexdigest().encode('utf-8')

    # 2 Generate CanonicalRequest
    # 2.1 Genrate CanonicalURI
    canonical_uri = quote(path)
    # 2.2 Generate CanonicalURI: not used here
    # 2.3 Generate CanonicalHeaders: only include host here
    canonical_headers = "host:%s" % quote(host).strip()
    # 2.4 Generate CanonicalRequest
    canonical_request = "%s\n%s\n\n%s" % (method.upper(), canonical_uri, canonical_headers)

    # 3 Generate Final Signature 
    signature = hmac.new(signing_key, canonical_request, hashlib.sha256).hexdigest()
    authorization = "bce-auth-v%s/%s/%s/%s/%s/%s" % (version, access_key, utc_time_str, expiration_seconds, signature_headers, signature)
    print authorization
    return authorization

def get_image(files):
    images = ''
    for file in files:
        print files
        handler = open(file, 'rb')
        image = handler.read()
        handler.close()
        if (images != ''):
            images += ','
        images += base64.b64encode(image)
    return images


if __name__ == "__main__":
    access_key = "ecfc82913a134851b654f5c6ac6b7ef0"
    secret_key = "019e4f9773e248fb8677e19e7a62053d"
    # url = "http://bfr.bj.baidubce.com/api/v1/faceverify/user/match"
    url = 'https://aip.baidubce.com/rest/2.0/face/v2/detect'
    method = "POST"
    utc_time = datetime.datetime.utcnow()
    utc_time_str = utc_time.strftime("%Y-%m-%dT%H:%M:%SZ")
    auth = gen_auth(access_key, secret_key, utc_time_str, url, method)
    header = {
        'Host':'bfr.bj.baidubce.com',
        'x-bce-date': utc_time_str,
        'authorization': auth,
        'accept':'*/*'
    }
    files=["match1.jpg","match2.jpg"]
    data = {
        'images': get_image(files),
    }
    request = urllib2.Request(url, urlencode(data), header)
    response = None
    try :
        response = urllib2.urlopen(request)
        post_res_str = response.read()
        print post_res_str
    except Exception as e:
        print e
    
