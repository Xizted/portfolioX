'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ThemeProvider from '@/theme/themeProvider';
import { getQueryClient } from '@/utils/reactQuery/getQueryClient';

const RootProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootProviders;
