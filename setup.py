from setuptools import setup, find_packages

setup(
    name='workmate',
    version='0.0.1',
    description='Workmate',
    long_description=open('README.rst').read(),
    author='Stuart George',
    author_email='stuart.bigmassa@gmail.com',
    url='https://github.com/bigmassa/workmate',
    download_url='https://pypi.python.org/pypi/',
    license='MIT',
    packages=find_packages(exclude=('example', 'tests')),
    install_requires=[
        'Django>=1.8,<1.10',
    ],
    include_package_data=True,
    keywords = ['workmate', ],
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Framework :: Django :: 1.8',
        'Framework :: Django :: 1.9',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
    ],
)
