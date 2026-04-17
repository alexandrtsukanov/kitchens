export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <body className="min-h-full flex flex-col">
            <h3>Header About</h3>
                {children}
            <h3>Footer About</h3>
        </body>
    );
  }