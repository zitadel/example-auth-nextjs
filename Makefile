.PHONY: help check start

help:
	@echo "Usage:"
	@echo "  make start   Start the development server"
	@echo "  make check   Verify required dependencies are installed"

check:
	@command -v node >/dev/null 2>&1 || { \
		echo "Error: Node.js is not installed." >&2; \
		echo "" >&2; \
		echo "  Install it from https://nodejs.org/ or use nvm:" >&2; \
		echo "    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash" >&2; \
		echo "    nvm install" >&2; \
		exit 1; \
	}
	@REQUIRED_MAJOR=$$(tr -d '\r' < .nvmrc | sed 's/^[[:space:]]*v\{0,1\}//; s/[^0-9].*//'); \
	ACTUAL_MAJOR=$$(node -v | sed 's/^v\([0-9]*\).*/\1/'); \
	if [ -z "$$REQUIRED_MAJOR" ]; then \
		echo "Warning: Could not parse Node.js version from .nvmrc" >&2; \
	elif [ "$$ACTUAL_MAJOR" -lt "$$REQUIRED_MAJOR" ]; then \
		echo "Error: Node.js version is too old." >&2; \
		echo "" >&2; \
		echo "  Required: v$$REQUIRED_MAJOR or later (from .nvmrc)" >&2; \
		echo "  Found:    $$(node -v)" >&2; \
		echo "" >&2; \
		echo "  Run 'nvm install' to switch to a supported version." >&2; \
		exit 1; \
	fi
	@command -v npm >/dev/null 2>&1 || { \
		echo "Error: npm is not installed." >&2; \
		echo "" >&2; \
		echo "  npm is typically bundled with Node.js. Reinstall Node.js from https://nodejs.org/" >&2; \
		exit 1; \
	}
	@test -f .env || { \
		echo "Error: Missing .env file." >&2; \
		echo "" >&2; \
		echo "  Copy the example file and fill in your Zitadel credentials:" >&2; \
		echo "    cp .env.example .env" >&2; \
		exit 1; \
	}

start: check
	npm install
	npm start
