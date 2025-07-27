'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({
			error,
			errorInfo,
		});

		// Логируем ошибку только в development
		if (process.env.NODE_ENV === 'development') {
			console.error('ErrorBoundary caught an error:', error, errorInfo);
		}

		// Вызываем callback если передан
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}

		// В продакшене отправляем в систему мониторинга
		if (process.env.NODE_ENV === 'production') {
			// Интеграция с системой мониторинга ошибок
			// Пример: Sentry.captureException(error, { contexts: { react: errorInfo } });
		}
	}

	handleRetry = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	handleReportError = () => {
		const { error, errorInfo } = this.state;
		if (error) {
			// Отправляем отчет об ошибке
			const errorReport = {
				message: error.message,
				stack: error.stack,
				componentStack: errorInfo?.componentStack,
				timestamp: new Date().toISOString(),
				userAgent: navigator.userAgent,
				url: window.location.href,
			};

			// Логируем только в development
			if (process.env.NODE_ENV === 'development') {
				console.log('Error report:', errorReport);
			}

			// В реальном проекте отправляем в систему мониторинга
			// sendErrorReport(errorReport);
		}
	};

	render() {
		if (this.state.hasError) {
			// Кастомный fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Дефолтный fallback UI
			return (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-start to-background-end p-4"
				>
					<div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
						<div className="text-center">
							<div className="text-6xl mb-4">⚠️</div>
							<h1 className="text-xl font-semibold text-white mb-2">
								Что-то пошло не так
							</h1>
							<p className="text-gray-300 mb-6">
								Произошла непредвиденная ошибка. Мы уже работаем над её
								исправлением.
							</p>

							<div className="space-y-3">
								<button
									onClick={this.handleRetry}
									className="w-full bg-primary hover:bg-primary-dark text-black font-semibold py-2 px-4 rounded-lg transition-colors"
								>
									Попробовать снова
								</button>

								<button
									onClick={this.handleReportError}
									className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10 font-semibold py-2 px-4 rounded-lg transition-colors"
								>
									Сообщить об ошибке
								</button>

								<button
									onClick={() => window.location.reload()}
									className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10 font-semibold py-2 px-4 rounded-lg transition-colors"
								>
									Перезагрузить страницу
								</button>
							</div>

							{process.env.NODE_ENV === 'development' && this.state.error && (
								<details className="mt-6 text-left">
									<summary className="cursor-pointer text-sm text-gray-400 hover:text-white">
										Детали ошибки (только для разработки)
									</summary>
									<div className="mt-2 p-3 bg-black/20 rounded text-xs font-mono text-red-400 overflow-auto">
										<div className="mb-2">
											<strong>Ошибка:</strong> {this.state.error.message}
										</div>
										{this.state.error.stack && (
											<div className="mb-2">
												<strong>Stack:</strong>
												<pre className="whitespace-pre-wrap">
													{this.state.error.stack}
												</pre>
											</div>
										)}
										{this.state.errorInfo?.componentStack && (
											<div>
												<strong>Component Stack:</strong>
												<pre className="whitespace-pre-wrap">
													{this.state.errorInfo.componentStack}
												</pre>
											</div>
										)}
									</div>
								</details>
							)}
						</div>
					</div>
				</motion.div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
