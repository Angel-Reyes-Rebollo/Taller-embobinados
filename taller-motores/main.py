"""Servidor sencillo. Ejecuta: python main.py  ->  http://localhost:8000"""
import http.server, socketserver, os, webbrowser
PORT = 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class H(http.server.SimpleHTTPRequestHandler):
    # Tipos de archivo fijos: evita el error de Windows que entrega el CSS/JS como texto plano
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".svg": "image/svg+xml",
        ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
    }
    def end_headers(self):
        # Sin caché: siempre carga los archivos más recientes
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
    def log_message(self, *a): pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), H) as s:
    print(f"Página disponible en http://localhost:{PORT}  (Ctrl+C para detener)")
    try: webbrowser.open(f"http://localhost:{PORT}")
    except Exception: pass
    try: s.serve_forever()
    except KeyboardInterrupt: print("\nServidor detenido.")
