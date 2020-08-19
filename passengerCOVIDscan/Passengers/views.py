from django.shortcuts import render
from django.http import JsonResponse
import base64
import os
import requests
from io import BytesIO
import json
import cv2
import numpy as np
from PIL import Image
from barcode import barCode
from glove_detection import tensorflow_infer as inf
from django.views.decorators.csrf import csrf_exempt
import matplotlib.pyplot as plt
import matplotlib as mpl
from mask_detection import tensorflow_infer as infer


def home(request):
    args = {'title': 'Home | PassengerCOVIDscan'}
    return render(request, 'home.html', args)


def team(request):
    args = {'title': 'Team | PassengerCOVIDscan'}
    return render(request, 'team.html', args)


def about(request):
    args = {'title': 'About | PassengerCOVIDscan'}
    return render(request, 'about.html', args)


def glove_scan(request):
    args = {'title': 'Gloves Scan | PassengerCOVIDscan'}
    return render(request, 'glove_scan.html', args)


def demo(request):
    args = {'title': 'Demo | PassengerCOVIDscan'}
    return render(request, 'demo.html', args)

def mask_scan(request):
    args = {'title': 'Mask Scan | PassengerCOVIDscan'}
    return render(request, 'mask.html', args)


def IDs_scan(request):
    args = {'title': 'ID Scan | PassengerCOVIDscan'}
    return render(request, 'passenger_id.html', args)

@csrf_exempt
def predict_ppe(request):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        print(body)
        img = eval(body)
        img = img['image']
        img = img.split(',')[1]
        img = base64.b64decode(img)
        img = Image.open(BytesIO(img))
        img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)

        prediction = infer.inference(img, draw_result=False, show_result=False, target_shape=(260, 260))
        p = prediction[0]
        if p[1] > 0.9 and p[0] == 0:
            p[0] = 0
        else:
            p[0] = 1

        pred = {'class': str(p[0]), 'score': str(p[1]), 'xmin': str(p[2]), 'ymin': str(p[3]), 'xmax': str(p[4]),
                'ymax': str(p[5])}
        args = {'data': pred, 'status': 1}
        return JsonResponse(args)
    else:
        return render(request, 'home.html', {})




@csrf_exempt
def badge_decode(request):
    args = {'title': 'Demo | PassengerCOVIDscan'}
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        print(type(body))
        img = eval(body)
        img = img['image']
        # print(img)
        decoded = barCode.decode(img)

        if decoded:
            json_data = json.dumps(decoded)
            args.update({
                'data': json_data,
                'status': 1
            })
            print(args)
            from django.core.mail import send_mail
            send_mail('Passenger info.', 'Hey there,'
                                              '\n Scan passenger ID through Vechicle no.907 location bhairawa street-42.'
                                              '\n ID information is :'+json_data+
                                              '\n Greetings,\n Passenger Safe Transportation',
                      'passenger.safetransport@gmail.com',['pradippandit026@gmail.com'],
                      fail_silently=True)

            return JsonResponse(args, safe=False)

        else:
            args.update({
                'data': 'No barcode found',
                'status': 0
            })
            return JsonResponse(args)
    else:
        return render(request, 'home.html', {})



def validate_files(files):
    for file in files:
        image_extensions = ['ras', 'xwd', 'bmp', 'jpe', 'jpg', 'jpeg', 'xpm', 'ief', 'pbm', 'tif', 'gif', 'ppm', 'xbm',
                            'tiff', 'rgb', 'pgm', 'png', 'pnm']
        ext = file.name.split('.')
        ext = ext[len(ext) - 1]
        if ext.lower() not in image_extensions:
            return False
    return True


@csrf_exempt
def predict_glove(request):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        print(body)
        img = eval(body)
        img = img['image']
        img = img.split(',')[1]
        img = base64.b64decode(img)
        img = Image.open(BytesIO(img))
        img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)

        prediction = inf.inference(img, draw_result=False, show_result=False, target_shape=(260, 260))
        p = prediction[0]
        if p[1] > 0.9 and p[0] == 0:
            p[0] = 0
        else:
            p[0] = 1

        pred = {'class': str(p[0]), 'score': str(p[1]), 'xmin': str(p[2]), 'ymin': str(p[3]), 'xmax': str(p[4]),
                'ymax': str(p[5])}
        args = {'data': pred, 'status': 1}
        return JsonResponse(args)
    else:
        return render(request, 'home.html', {})

