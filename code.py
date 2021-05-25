from adafruit_circuitplayground import cp
import time
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.nordic import UARTService

uart = UARTService()
advertisement = ProvideServicesAdvertisement(uart)
while True:
    if cp.button_a:
        cp.play_file("horn.wav")
    if cp.button_b:
        cp.play_file("horn.wav")

    R = 0
    G = 0
    B = 0
    x, y, z = cp.acceleration
    tuplaxyz = str(x) + ',' + str(y) + ',' + str(z);
    print(tuplaxyz)
    cp.pixels.fill(((R + abs(int(x))), (G + abs(int(y))), (B + abs(int(z)))))
    uart.write(tuplaxyz.encode('utf-8'))
    time.sleep(0.1)